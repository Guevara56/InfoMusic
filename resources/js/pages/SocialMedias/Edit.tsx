import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleAlert } from 'lucide-react'; 

interface SocialMedia {
    id: number;
    name: string;
    genre: string;
    description: string;
}

interface Props {
    socialmedia: SocialMedia;
}

export default function Edit({ socialmedia }: Props) {

    const { data, setData, put, processing, errors } = useForm({
        name: socialmedia.name,
        genre: socialmedia.genre,
        description: socialmedia.description,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('socialmedias.update', socialmedia.id));
    }

    return (
        <AppLayout breadcrumbs={[{title: 'Edit a SocialMedia', href: `/socialmedias/${socialmedia.id}/edit`}]}>
            <Head title="Update a SocialMedia" />
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
                        <Label htmlFor="socialmedia name">Name</Label>
                        <Input placeholder="SocialMedia Name" value={data.name} onChange={(e) => setData('name', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="socialmedia genre">Genre</Label>
                        <Input placeholder="Genre" value={data.genre} onChange={(e) => setData('genre', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="socialmedia description">Description</Label>
                        <Textarea placeholder="Description" value={data.description} onChange={(e) => setData('description', e.target.value)}></Textarea>
                    </div>
                    <Button disabled={processing} type="submit" className="mt-4">Update SocialMedia</Button>
                </form>
            </div>
        </AppLayout>
    );
}
