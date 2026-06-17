import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleAlert } from 'lucide-react';
import ImageInput from '@/components/ImageInput';
import { router } from '@inertiajs/react';

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
    release_year: string | null;
    image: string | null;
    spotify_url: string | null;
    apple_music_url: string | null;
    youtube_url: string | null;
    artist_id: number;
    artist: ArtistType;
    genres: GenreType[];
}

interface Props {
    song: Song;
    artists: ArtistType[];
    genres: GenreType[];
}

type SongForm = {
    title: string;
    duration: string;
    release_year: string;
    artist_id: string;
    genre_ids: string[];
    spotify_url: string;
    apple_music_url: string;
    youtube_url: string;
    image: File | null;
};

export default function Edit() {
    const { song, artists, genres } = usePage<Props>().props;

    const { data, setData, put, processing, errors } = useForm<SongForm>({
        title: song.title || '',
        duration: song.duration || '',
        release_year: song.release_year || '',
        artist_id: song.artist_id ? song.artist_id.toString() : '',
        genre_ids: song.genres ? song.genres.map((g) => g.id.toString()) : [],
        spotify_url: song.spotify_url || '',
        apple_music_url: song.apple_music_url || '',
        youtube_url: song.youtube_url || '',
        image: null,
    });



    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.post(
            route('songs.update', song.id),
            {
                ...data,
                _method: 'put',
            },
            {
                forceFormData: true,
                preserveScroll: true,
            }
        );
    };

    return (

        <AppLayout breadcrumbs={[{ title: 'Edit Song', href: `/songs/${song.id}/edit` }]}>
            <Head title="Update Song" />

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
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            placeholder="Song Title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="artist">Artist</Label>
                        <select
                            value={data.artist_id}
                            onChange={(e) => setData('artist_id', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                        ">
                            <option value="" className="bg-gray-900 text-white">
                                Select an artist
                            </option>

                            {artists.map((artist) => (
                                <option
                                    key={artist.id}
                                    value={artist.id}
                                    className="bg-gray-900 text-white"
                                >
                                    {artist.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="genres">Genres</Label>
                        <select
                            id="genres"
                            multiple
                            value={data.genre_ids}
                            onChange={(e) => {
                                const selected = Array.from(
                                    e.target.selectedOptions,
                                    (opt) => opt.value
                                );
                                setData('genre_ids', selected);
                            }}
                            className="w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                             size={5}
                        >
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-gray-500">
                            Hold Ctrl/Cmd to select multiple
                        </p>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                            id="duration"
                            placeholder="3:45"
                            value={data.duration}
                            onChange={(e) => setData('duration', e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="release_year">Release Year</Label>
                        <Input
                            id="release_year"
                            placeholder="2024"
                            value={data.release_year}
                            onChange={(e) => setData('release_year', e.target.value)}
                        />
                    </div>

                    <ImageInput
                        label="Song cover"
                        currentImage={song.image ? `/${song.image}` : null}
                        onChange={(file) => setData('image', file)}
                    />



                    <div className="space-y-1.5">
                        <Label>Spotify URL</Label>
                        <Input
                            value={data.spotify_url}
                            onChange={(e) => setData('spotify_url', e.target.value)}
                            placeholder="https://open.spotify.com/..."
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label>Apple Music URL</Label>
                        <Input
                            value={data.apple_music_url}
                            onChange={(e) =>
                                setData('apple_music_url', e.target.value)
                            }
                            placeholder="https://music.apple.com/..."
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label>YouTube URL</Label>
                        <Input
                            value={data.youtube_url}
                            onChange={(e) => setData('youtube_url', e.target.value)}
                            placeholder="https://youtube.com/..."
                        />
                    </div>

                    <Button type="submit" disabled={processing} className="mt-4">
                        {processing ? 'Updating...' : 'Update Song'}
                    </Button>
                </form>
            </div>
        </AppLayout>


    );
}