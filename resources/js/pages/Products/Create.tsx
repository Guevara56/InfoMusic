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

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Create', href: '/products/create' },
];

interface Artist {
    id: number;
    name: string;
}

interface PageProps {
    artists: Artist[];
}

export default function Create() {

    const { artists } = usePage().props as PageProps;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        description: '',
        artist_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('products.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Product" />
            <div className="w-8/12 p-4">

                <form onSubmit={handleSubmit} className="space-y-4">

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

                    <div className="gap-1.5">
                        <Label>Name</Label>
                        <Input 
                            value={data.name} 
                            onChange={(e) => setData('name', e.target.value)} 
                        />
                    </div>

                    <div className="gap-1.5">
                        <Label>Price</Label>
                        <Input 
                            value={data.price} 
                            onChange={(e) => setData('price', e.target.value)} 
                        />
                    </div>

                    <div className="gap-1.5">
                        <Label>Artist</Label>
                        <select
                            className="border rounded p-2 w-full"
                            value={data.artist_id}
                            onChange={(e) => setData('artist_id', e.target.value)}
                        >
                            <option value="">Select an artist</option>
                            {artists.map(a => (
                                <option key={a.id} value={a.id}>{a.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="gap-1.5">
                        <Label>Description</Label>
                        <Textarea 
                            value={data.description} 
                            onChange={(e) => setData('description', e.target.value)} 
                        />
                    </div>

                    <Button disabled={processing} type="submit">Add Product</Button>
                </form>

            </div>  
        </AppLayout>
    );
}
