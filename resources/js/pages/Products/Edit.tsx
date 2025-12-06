import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleAlert } from 'lucide-react';

interface Artist {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    price: string;
    description: string;
    artist_id: number;
}

interface Props {
    product: Product;
    artists: Artist[];
}

export default function Edit({ product, artists }: Props) {

    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        price: product.price,
        description: product.description,
        artist_id: product.artist_id.toString(),
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('products.update', product.id));
    }

    return (
        <AppLayout breadcrumbs={[{title: 'Edit Product', href: `/products/${product.id}/edit`}]}>
            <Head title="Update Product" />
            <div className="w-8/12 p-4">
                <div className="space-y-4">
                    {/* Display errors */}
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
                        <Label htmlFor="product_name">Name</Label>
                        <Input 
                            placeholder="Product Name" 
                            value={data.name} 
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>

                    <div className='gap-1.5'>
                        <Label htmlFor="product_price">Price</Label>
                        <Input 
                            type="number" 
                            step="0.01"
                            placeholder="29.99" 
                            value={data.price} 
                            onChange={(e) => setData('price', e.target.value)}
                        />
                    </div>

                    <div className='gap-1.5'>
                        <Label htmlFor="product_description">Description</Label>
                        <Textarea 
                            placeholder="Description" 
                            value={data.description} 
                            onChange={(e) => setData('description', e.target.value)}
                        />
                    </div>

                    <div className='gap-1.5'>
                        <Label htmlFor="artist">Artist</Label>
                        <select 
                            value={data.artist_id}
                            onChange={(e) => setData('artist_id', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
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

                    <Button 
                        disabled={processing} 
                        onClick={handleUpdate} 
                        className="mt-4"
                    >
                        Update Product
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}