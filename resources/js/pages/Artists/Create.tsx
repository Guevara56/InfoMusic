import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleAlert } from 'lucide-react';
import countries from 'world-countries';
import Select from 'react-select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Artist',
        href: '/artists/create',
    },
];

interface LabelType {
    id: number;
    name: string;
}

interface Props {
    labels: LabelType[];
}

export default function Create() {
    const { labels } = usePage().props as Props;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        bio: '',
        country: '',
        formed_year: '',
        avatar: '',
        label_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('artists.store'));
    }

    // Preparar opciones para react-select
    const countryOptions = countries
        .map(country => ({
            value: country.name.common,
            label: `${country.flag} ${country.name.common}`,
        }))
        .sort((a, b) => a.label.localeCompare(b.label));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Artist" />
            <div className="w-8/12 p-4">
                <div className="space-y-4">
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

                    <div className='space-y-1.5'>
                        <Label htmlFor="name">Name</Label>
                        <Input 
                            placeholder="Artist Name" 
                            value={data.name} 
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>

                    <div className='space-y-1.5'>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                            placeholder="Biography" 
                            value={data.bio} 
                            onChange={(e) => setData('bio', e.target.value)}
                        />
                    </div>

                    {/* REACT-SELECT PARA PAÍSES */}
                    <div className='space-y-1.5'>
                        <Label htmlFor="country">Country</Label>
                        <Select
                            value={countryOptions.find(opt => opt.value === data.country) || null}
                            onChange={(option) => setData('country', option?.value || '')}
                            options={countryOptions}
                            placeholder="Select a country"
                            isSearchable
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    borderColor: '#d1d5db',
                                    borderRadius: '0.375rem',
                                    padding: '0.125rem',
                                    minHeight: '42px',
                                }),
                                menu: (base) => ({
                                    ...base,
                                    zIndex: 50,
                                }),
                            }}
                        />
                        {errors.country && (
                            <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                        )}
                    </div>

                    <div className='space-y-1.5'>
                        <Label htmlFor="formed_year">Formed Year</Label>
                        <Input 
                            placeholder="1960" 
                            value={data.formed_year} 
                            onChange={(e) => setData('formed_year', e.target.value)}
                        />
                    </div>

                    <div className='space-y-1.5'>
                        <Label htmlFor="avatar">Avatar URL</Label>
                        <Input 
                            placeholder="https://..." 
                            value={data.avatar} 
                            onChange={(e) => setData('avatar', e.target.value)}
                        />
                    </div>

                    <div className='space-y-1.5'>
                        <Label htmlFor="label">Label (Optional)</Label>
                        <select 
                            value={data.label_id}
                            onChange={(e) => setData('label_id', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Independent</option>
                            {labels.map(label => (
                                <option key={label.id} value={label.id}>
                                    {label.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button 
                        disabled={processing} 
                        onClick={handleSubmit} 
                        className="mt-4"
                    >
                        Add Artist
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}