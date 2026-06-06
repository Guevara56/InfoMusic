// resources/js/components/ImageInput.tsx
// Componente reutilizable para subir imágenes en los formularios del admin

import { useRef, useState } from 'react';
import { Upload, X, Image } from 'lucide-react';

interface ImageInputProps {
    label?: string;
    currentImage?: string | null;   // ruta relativa en storage (ej: "artists/foto.jpg")
    onChange: (file: File | null) => void;
    previewSize?: number;           // px, por defecto 120
}

export default function ImageInput({
    label = 'Imagen',
    currentImage,
    onChange,
    previewSize = 120,
}: ImageInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(
        currentImage ? `/storage/${currentImage}` : null
    );

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            onChange(file);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onChange(null);
        if (inputRef.current) inputRef.current.value = '';
    };

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{label}</label>

            <div className="flex items-center gap-4">
                {/* Preview */}
                <div
                    style={{ width: previewSize, height: previewSize }}
                    className="rounded-lg border border-dashed border-muted-foreground/40 bg-muted flex items-center justify-center overflow-hidden flex-shrink-0"
                >
                    {preview ? (
                        <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                        <Image size={28} className="text-muted-foreground opacity-40" />
                    )}
                </div>

                {/* Botones */}
                <div className="flex flex-col gap-2">
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="flex items-center gap-2 px-3 py-2 text-sm border rounded-md hover:bg-muted transition-colors"
                    >
                        <Upload size={14} />
                        {preview ? 'Cambiar imagen' : 'Subir imagen'}
                    </button>

                    {preview && (
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="flex items-center gap-2 px-3 py-2 text-sm border border-red-200 text-red-500 rounded-md hover:bg-red-50 transition-colors"
                        >
                            <X size={14} />
                            Eliminar
                        </button>
                    )}

                    <p className="text-xs text-muted-foreground">
                        JPG, PNG, WebP · Máx 2MB
                    </p>
                </div>
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/jpg,image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFile}
            />
        </div>
    );
}