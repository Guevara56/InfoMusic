interface ProductImageProps {
    image: string | null;
    name: string;
    height?: number;
    style?: React.CSSProperties;
}
 
export function ProductImage({ image, name, height = 130, style }: ProductImageProps) {
    const isExternal = image?.startsWith('http');
    const src = isExternal ? image : image ? `/storage/${image}` : '/images/default-product.svg';
 
    return (
        <div style={{
            height, background: 'linear-gradient(135deg, #1a1a2e, #0f0f1a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', ...style,
        }}>
            <img
                src={src!}
                alt={name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { (e.target as HTMLImageElement).src = '/images/default-product.svg'; }}
            />
        </div>
    );
}