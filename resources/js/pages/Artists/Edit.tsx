import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ImageInput from '@/components/ImageInput';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleAlert } from 'lucide-react';
import countries from 'world-countries';
import Select from 'react-select';

interface LabelType { id: number; name: string; }
interface Artist {
    id: number; name: string; bio: string; country: string;
    formed_year: string; avatar: string | null; label_id: number | null;
}
interface Props { artist: Artist; labels: LabelType[]; }

export default function Edit() {
    const { artist, labels } = usePage().props as Props;

    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        bio: string;
        country: string;
        formed_year: string;
        avatar: File | null;
        label_id: string;
        _method: string;
    }>({
        name: artist.name || '',
        bio: artist.bio || '',
        country: artist.country || '',
        formed_year: artist.formed_year || '',
        avatar: null,               // null = no cambiar la imagen actual
        label_id: artist.label_id ? artist.label_id.toString() : '',
        _method: 'PUT',              // method spoofing para PUT con FormData
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        // Usamos post con _method: 'PUT' porque PUT no soporta FormData nativamente
        post(route('artists.update', artist.id), {
            forceFormData: true,
        });
    };

    const countryOptions = countries
        .map(c => ({
            value: c.translations?.spa?.common || c.name.common,
            label: `${c.flag} ${c.translations?.spa?.common || c.name.common}`
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

    return (
        <AppLayout breadcrumbs={[{ title: 'Edit Artist', href: `/artists/${artist.id}/edit` }]}>
            <Head title="Update Artist" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleUpdate} className="space-y-4">
                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <CircleAlert />
                            <AlertTitle>Errors!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-1.5">
                        <Label>Name</Label>
                        <Input placeholder="Artist Name" value={data.name} onChange={e => setData('name', e.target.value)} />
                    </div>

                    <div className="space-y-1.5">
                        <Label>Bio</Label>
                        <Textarea placeholder="Biography" value={data.bio} onChange={e => setData('bio', e.target.value)} />
                    </div>

                    <div className="space-y-1.5">
                        <Label>Country</Label>
                        <Select
                            value={countryOptions.find(o => o.value === data.country) || null}
                            onChange={o => setData('country', o?.value || '')}
                            options={countryOptions}
                            placeholder="Select a country"
                            isSearchable
                            isClearable
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    borderColor: '#d1d5db',
                                    borderRadius: '0.375rem',
                                    padding: '0.125rem',
                                    minHeight: '42px',
                                    backgroundColor: '#111827',
                                }),
                                menu: (base) => ({
                                    ...base,
                                    zIndex: 50,
                                    backgroundColor: '#1f2937',
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isFocused
                                        ? '#374151'
                                        : '#1f2937',
                                    color: '#ffffff',
                                    cursor: 'pointer',
                                }),
                                singleValue: (base) => ({
                                    ...base,
                                    color: '#ffffff',
                                }),
                                input: (base) => ({
                                    ...base,
                                    color: '#ffffff',
                                }),
                                placeholder: (base) => ({
                                    ...base,
                                    color: '#9ca3af',
                                }),
                            }}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label>Formed Year</Label>
                        <Input placeholder="1990" value={data.formed_year} onChange={e => setData('formed_year', e.target.value)} />
                    </div>

                    {/* IMAGEN — muestra la actual y permite cambiarla */}
                    <ImageInput
                        label="Foto del artista"
                        currentImage={artist.avatar}
                        onChange={file => setData('avatar', file)}
                    />

                    <div className="space-y-1.5">
                        <Label>Label (Optional)</Label>
                        <select value={data.label_id} onChange={e => setData('label_id', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        "><option value="">Independent</option>
                            {labels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                        </select>
                    </div>

                    <Button type="submit" disabled={processing} className="mt-4">
                        {processing ? 'Updating...' : 'Update Artist'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}