import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleAlert } from 'lucide-react';
import countries from 'world-countries';

interface LabelType {
    id: number;
    name: string;
}

interface Artist {
    id: number;
    name: string;
    bio: string;
    country: string;
    formed_year: string;
    avatar: string;
    label_id: number | null;
}

interface Props {
    artist: Artist;
    labels: LabelType[];
}

export default function Edit() {
    const { artist, labels } = usePage().props as Props;

    const { data, setData, put, processing, errors } = useForm({
        name: artist.name || '',
        bio: artist.bio || '',
        country: artist.country || '',
        formed_year: artist.formed_year || '',
        avatar: artist.avatar || '',
        label_id: artist.label_id ? artist.label_id.toString() : '',
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('artists.update', artist.id));
    }

    const sortedCountries = [...countries].sort((a, b) => 
            a.name.common.localeCompare(b.name.common)
        );

    return (
        <AppLayout breadcrumbs={[{title: 'Edit Artist', href: `/artists/${artist.id}/edit`}]}>
            <Head title="Update Artist" />
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

                     <div className='space-y-1.5'>
                        <Label htmlFor="country">Country</Label>
                        <select 
                            value={data.country}
                            onChange={(e) => setData('country', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select a country</option>
                            {sortedCountries.map(country => (
                                <option key={country.cca2} value={country.name.common}>
                                    {country.flag} {country.name.common}
                                </option>
                            ))}
                        </select>
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
                            className="w-full px-3 py-2 border rounded"
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
                        onClick={handleUpdate} 
                        className="mt-4"
                    >
                        Update Artist
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}