import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleAlert } from 'lucide-react';

interface ArtistType {
    id: number;
    name: string;
}

interface SocialMedia {
    id: number;
    platform: string;
    url: string;
    followers: string;
    artist_id: number;
}

interface Props {
    socialMedia: SocialMedia;
    artists: ArtistType[];
}

export default function Edit() {
    const { socialMedia, artists } = usePage().props as Props;

    const { data, setData, put, processing, errors } = useForm({
        platform: socialMedia.platform || '',
        url: socialMedia.url || '',
        followers: socialMedia.followers || '',
        artist_id: socialMedia.artist_id ? socialMedia.artist_id.toString() : '',
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('social-medias.update', socialMedia.id));
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
        <AppLayout breadcrumbs={[{title: 'Edit Social Media', href: `/social-medias/${socialMedia.id}/edit`}]}>
            <Head title="Update Social Media" />
            
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
                    </div>

                    {/* FOLLOWERS */}
                    <div className='space-y-1.5'>
                        <Label htmlFor="followers">Followers (Optional)</Label>
                        <Input 
                            placeholder="1.5M" 
                            value={data.followers} 
                            onChange={(e) => setData('followers', e.target.value)}
                        />
                    </div>

                    {/* SUBMIT */}
                    <Button 
                        disabled={processing} 
                        onClick={handleUpdate} 
                        className="mt-4"
                    >
                        {processing ? 'Updating...' : 'Update Social Media'}
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}