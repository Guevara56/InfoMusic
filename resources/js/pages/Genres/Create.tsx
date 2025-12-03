import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleAlert } from 'lucide-react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create',
        href: '/genres/create',
    },
];

export default function Create() {

    const {data, setData, post, processing, errors} = useForm({
        name: '',
        genre: '',
        description: '',
    });  

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('genres.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Genre" />
            <div className ="w-8/12 p-4">
                <form onSubmit={handleSubmit}className = "space-y-4">
                     {/* Display error */}

                     {Object.keys(errors).length > 0 && (
                        <Alert>
                        <CircleAlert />
                        <AlertTitle>Errors!</AlertTitle>
                        <AlertDescription>
                            <ul>
                                {Object.entries(errors).map(([key,message])=> (
                                    <li key={key}>{message as string}</li>
                                ))}
                            </ul>
                        </AlertDescription>
                        </Alert>
                     )}
                    <div className='gap-1.5'>
                        <Label htmlFor="genre name">Name</Label>
                        <Input placeholder=" Name" value = {data.name} onChange={(e) => setData('name', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="genre genre">Genre</Label>
                        <Input placeholder="Genre" value = {data.genre} onChange={(e) => setData('genre', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="genre description">Description</Label>
                        <Textarea placeholder="Description" value = {data.description} onChange={(e) => setData('description', e.target.value)}></Textarea>
                    </div>
                    <Button disabled={processing} type="submit" className="mt-4">Add Genre</Button>
                </form>
            </div>
        </AppLayout>
    );
}
