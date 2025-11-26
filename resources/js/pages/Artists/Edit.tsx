import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleAlert } from 'lucide-react'; 

interface Artist {
    id: number;
    name: string;
    genre: string;
    description: string;
}

interface Props {
    artist: Artist;
}

export default function Edit({ artist }: Props) {

    const { data, setData, put, processing, errors } = useForm({
        name: artist.name,
        genre: artist.genre,
        description: artist.description,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('artists.update', artist.id));
    }

    return (
        <AppLayout breadcrumbs={[{title: 'Edit a Artist', href: `/artists/${artist.id}/edit`}]}>
            <Head title="Update a Artist" />
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
                        <Label htmlFor="artist name">Name</Label>
                        <Input placeholder="Artist Name" value={data.name} onChange={(e) => setData('name', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="artist genre">Genre</Label>
                        <Input placeholder="Genre" value={data.genre} onChange={(e) => setData('genre', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="artist description">Description</Label>
                        <Textarea placeholder="Description" value={data.description} onChange={(e) => setData('description', e.target.value)}></Textarea>
                    </div>
                    <Button disabled={processing} type="submit" className="mt-4">Update Artist</Button>
                </form>
            </div>
        </AppLayout>
    );
}
