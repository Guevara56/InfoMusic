import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleAlert } from 'lucide-react'; 

interface Song {
    id: number;
    name: string;
    genre: string;
    description: string;
}

interface Props {
    song: Song;
}

export default function Edit({ song }: Props) {

    const { data, setData, put, processing, errors } = useForm({
        name: song.name,
        genre: song.genre,
        description: song.description,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('songs.update', song.id));
    }

    return (
        <AppLayout breadcrumbs={[{title: 'Edit a Song', href: `/songs/${song.id}/edit`}]}>
            <Head title="Update a Song" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleUpdate} className="space-y-4">
                    {/* Display error */}

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
                    <div className='gap-1.5'>
                        <Label htmlFor="song name">Name</Label>
                        <Input placeholder="Song Name" value={data.name} onChange={(e) => setData('name', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="song genre">Genre</Label>
                        <Input placeholder="Genre" value={data.genre} onChange={(e) => setData('genre', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="song description">Description</Label>
                        <Textarea placeholder="Description" value={data.description} onChange={(e) => setData('description', e.target.value)}></Textarea>
                    </div>
                    <Button disabled={processing} type="submit" className="mt-4">Update Song</Button>
                </form>
            </div>
        </AppLayout>
    );
}
