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

interface GenreType {
    id: number;
    name: string;
}

interface Song {
    id: number;
    title: string;
    duration: string;
    release_year: string;
    artist_id: number;
    genres: GenreType[];
}

interface Props {
    song: Song;
    artists: ArtistType[];
    genres: GenreType[];
}

export default function Edit() {
    const { song, artists, genres } = usePage().props as Props;

    const { data, setData, put, processing, errors } = useForm({
        title: song.title || '',
        duration: song.duration || '',
        release_year: song.release_year || '',
        artist_id: song.artist_id ? song.artist_id.toString() : '',
        genre_ids: song.genres ? song.genres.map(g => g.id.toString()) : [] as string[],
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('songs.update', song.id));
    }

    return (
        <AppLayout breadcrumbs={[{title: 'Edit Song', href: `/songs/${song.id}/edit`}]}>
            <Head title="Update Song" />
            
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

                    {/* TITLE */}
                    <div className='space-y-1.5'>
                        <Label htmlFor="title">Title</Label>
                        <Input 
                            placeholder="Song Title" 
                            value={data.title} 
                            onChange={(e) => setData('title', e.target.value)}
                            autoFocus
                        />
                    </div>

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

                    {/* GENRES */}
                    <div className='space-y-1.5'>
                        <Label htmlFor="genres">Genres</Label>
                        <select 
                            multiple
                            value={data.genre_ids}
                            onChange={(e) => {
                                const selected = Array.from(e.target.selectedOptions, opt => opt.value);
                                setData('genre_ids', selected);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            size={5}
                        >
                            {genres.map((genre: GenreType) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500">Hold Ctrl/Cmd to select multiple</p>
                    </div>

                    {/* DURATION */}
                    <div className='space-y-1.5'>
                        <Label htmlFor="duration">Duration</Label>
                        <Input 
                            placeholder="3:45" 
                            value={data.duration} 
                            onChange={(e) => setData('duration', e.target.value)}
                        />
                    </div>

                    {/* RELEASE YEAR */}
                    <div className='space-y-1.5'>
                        <Label htmlFor="release_year">Release Year</Label>
                        <Input 
                            placeholder="2024" 
                            value={data.release_year} 
                            onChange={(e) => setData('release_year', e.target.value)}
                        />
                    </div>

                    {/* SUBMIT */}
                    <Button 
                        disabled={processing} 
                        onClick={handleUpdate} 
                        className="mt-4"
                    >
                        {processing ? 'Updating...' : 'Update Song'}
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}