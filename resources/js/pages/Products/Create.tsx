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
    {
        title: 'Create Product',
        href: '/products/create',
    },
];

interface ArtistType {
    id: number;
    name: string;
}

interface CategoryType {
    id: number;
    name: string;
}

interface Props {
    artists: ArtistType[];
    categories: CategoryType[];
}

export default function Create() {
    const { artists, categories } = usePage().props as Props;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        stock: '',
        description: '',
        image: '',
        product_category_id: '',
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
                <div className="space-y-4">
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

                    <div className='space-y-1.5'>
                        <Label htmlFor="name">Product Name</Label>
                        <Input 
                            placeholder="Product Name" 
                            value={data.name} 
                            onChange={(e) => setData('name', e.target.value)}
                            autoFocus
                        />
                    </div>

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

                    <div className='space-y-1.5'>
                        <Label htmlFor="category">Category</Label>
                        <select 
                            value={data.product_category_id}
                            onChange={(e) => setData('product_category_id', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.product_category_id && (
                            <p className="text-red-500 text-sm mt-1">{errors.product_category_id}</p>
                        )}
                    </div>

                    <div className='space-y-1.5'>
                        <Label htmlFor="price">Price</Label>
                        <Input 
                            type="number"
                            step="0.01"
                            placeholder="29.99" 
                            value={data.price} 
                            onChange={(e) => setData('price', e.target.value)}
                        />
                    </div>

                    <div className='space-y-1.5'>
                        <Label htmlFor="stock">Stock</Label>
                        <Input 
                            type="number"
                            placeholder="10" 
                            value={data.stock} 
                            onChange={(e) => setData('stock', e.target.value)}
                        />
                    </div>

                    <div className='space-y-1.5'>
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                            placeholder="Product description..." 
                            value={data.description} 
                            onChange={(e) => setData('description', e.target.value)}
                            rows={5}
                        />
                    </div>

                    <div className='space-y-1.5'>
                        <Label htmlFor="image">Image URL (Optional)</Label>
                        <Input 
                            type="url"
                            placeholder="https://..." 
                            value={data.image} 
                            onChange={(e) => setData('image', e.target.value)}
                        />
                    </div>

                    <Button 
                        disabled={processing} 
                        onClick={handleSubmit} 
                        className="mt-4"
                    >
                        {processing ? 'Creating...' : 'Add Product'}
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}