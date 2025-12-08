import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Social Media',
        href: '/social-medias/create',
    },
];

interface ArtistType {
    id: number;
    name: string;
}

interface Props {
    artists: ArtistType[];
}

export default function Create() {
    const { artists } = usePage().props as Props;

    const { data, setData, post, processing, errors } = useForm({
        platform: '',
        url: '',
        followers: '',
        artist_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('social-medias.store'));
    }

    const platforms = [
        'Instagram',
        'Twitter',
        'Facebook',
        'TikTok',
        'YouTube',
        'Spotify',
        'SoundCloud',
        'Bandcamp',
        'Other'
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Social Media" />
            
            <div className="w-8/12 p-4">
                <div className="space-y-4">
                    {/* ERRORES */}
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

                    {/* ARTIST */}
                    <div className='space-y-1.5'>
                        <Label htmlFor="artist">Artist</Label>
                        <select 
                            value={data.artist_id}
                            onChange={(e) => setData('artist_id', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select an artist</option>
                            {artists.map(artist => (
                                <option key={artist.id} value={artist.id}>
                                    {artist.name}
                                </option>
                            ))}
                        </select>
                        {errors.artist_id && (
                            <p className="text-red-500 text-sm mt-1">{errors.artist_id}</p>
                        )}
                    </div>

                    {/* PLATFORM */}
                    <div className='space-y-1.5'>
                        <Label htmlFor="platform">Platform</Label>
                        <select 
                            value={data.platform}
                            onChange={(e) => setData('platform', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select platform</option>
                            {platforms.map(platform => (
                                <option key={platform} value={platform}>
                                    {platform}
                                </option>
                            ))}
                        </select>
                        {errors.platform && (
                            <p className="text-red-500 text-sm mt-1">{errors.platform}</p>
                        )}
                    </div>

                    {/* URL */}
                    <div className='space-y-1.5'>
                        <Label htmlFor="url">URL</Label>
                        <Input 
                            type="url"
                            placeholder="https://instagram.com/artist" 
                            value={data.url} 
                            onChange={(e) => setData('url', e.target.value)}
                        />
                        {errors.url && (
                            <p className="text-red-500 text-sm mt-1">{errors.url}</p>
                        )}
                    </div>

                    {/* FOLLOWERS */}
                    <div className='space-y-1.5'>
                        <Label htmlFor="followers">Followers (Optional)</Label>
                        <Input 
                            placeholder="1.5M" 
                            value={data.followers} 
                            onChange={(e) => setData('followers', e.target.value)}
                        />
                        {errors.followers && (
                            <p className="text-red-500 text-sm mt-1">{errors.followers}</p>
                        )}
                    </div>

                    {/* SUBMIT */}
                    <Button 
                        disabled={processing} 
                        onClick={handleSubmit} 
                        className="mt-4"
                    >
                        {processing ? 'Creating...' : 'Add Social Media'}
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}