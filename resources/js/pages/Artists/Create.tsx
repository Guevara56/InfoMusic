import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import ImageInput from '@/components/ImageInput';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleAlert } from 'lucide-react';
import countries from 'world-countries';
import Select from 'react-select';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Create Artist', href: '/artists/create' },
];

interface LabelType { id: number; name: string; }
interface GenreType { id: number; name: string; }
interface Props { labels: LabelType[]; genres: GenreType[]; }

export default function Create() {
    const { labels, genres } = usePage().props as Props;

    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        bio: string;
        country: string;
        formed_year: string;
        avatar: File | null;
        label_id: string;
        genre_ids: string[];
    }>({
        name: '',
        bio: '',
        country: '',
        formed_year: '',
        avatar: null,
        label_id: '',
        genre_ids: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('artists.store'), {
            forceFormData: true, // necesario para enviar ficheros
        });
    };

    const countryOptions = countries
        .map(c => ({
            value: c.translations?.spa?.common || c.name.common,
            label: `${c.flag} ${c.translations?.spa?.common || c.name.common}`
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Artist" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <Label>Nombre</Label>
                        <Input placeholder="Artist Name" value={data.name} onChange={e => setData('name', e.target.value)} />
                    </div>

                    <div className="space-y-1.5">
                        <Label>Bio</Label>
                        <Textarea placeholder="Biography" value={data.bio} onChange={e => setData('bio', e.target.value)} />
                    </div>

                    <div className="space-y-1.5">
                        <Label>País</Label>
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
                        <Label>Generos</Label>
                        <select multiple value={data.genre_ids}
                            onChange={e => setData('genre_ids', Array.from(e.target.selectedOptions, o => o.value))}
                            className="w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        ">
                            {genres.map((g: GenreType) => <option key={g.id} value={g.id}>{g.name}</option>)}
                        </select>
                        <p className="text-xs text-gray-500">Hold Ctrl/Cmd to select multiple</p>
                    </div>

                    <div className="space-y-1.5">
                        <Label>Año Debut</Label>
                        <Input placeholder="1990" value={data.formed_year} onChange={e => setData('formed_year', e.target.value)} />
                    </div>

                    {/* IMAGEN — reemplaza el campo Avatar URL */}
                    <ImageInput
                        label="Foto del artista"
                        onChange={file => setData('avatar', file)}
                    />

                    <div className="space-y-1.5">
                        <Label>Discográfica</Label>
                        <select value={data.label_id} onChange={e => setData('label_id', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        ">
                            <option value="">Independent</option>
                            {labels.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                        </select>
                    </div>

                    <Button type="submit" disabled={processing} className="mt-4">
                        {processing ? 'Creating...' : 'Add Artist'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}