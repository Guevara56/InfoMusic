import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleAlert } from 'lucide-react';

interface ArtistType {
    id: number;
    name: string;
}

interface CategoryType {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    price: string;
    stock: number;
    description: string;
    image: string;
    product_category_id: number;
    artist_id: number;
}

interface Props {
    product: Product;
    artists: ArtistType[];
    categories: CategoryType[];
}

export default function Edit() {
    const { product, artists, categories } = usePage().props as Props;

    const { data, setData, put, processing, errors } = useForm({
        name: product.name || '',
        price: product.price || '',
        stock: product.stock ? product.stock.toString() : '',
        description: product.description || '',
        image: product.image || '',
        product_category_id: product.product_category_id ? product.product_category_id.toString() : '',
        artist_id: product.artist_id ? product.artist_id.toString() : '',
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

                    {/* NAME */}
                    <div className='space-y-1.5'>
                        <Label htmlFor="name">Product Name</Label>
                        <Input 
                            placeholder="Product Name" 
                            value={data.name} 
                            onChange={(e) => setData('name', e.target.value)}
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

                    {/* CATEGORY */}
                    <div className='space-y-1.5'>
                        <Label htmlFor="category">Category</Label>
                        <select 
                            value={data.product_category_id}
                            onChange={(e) => setData('product_category_id', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select a category</option>
                            {categories.map((category: CategoryType) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* PRICE */}
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

                    {/* STOCK */}
                    <div className='space-y-1.5'>
                        <Label htmlFor="stock">Stock</Label>
                        <Input 
                            type="number"
                            placeholder="10" 
                            value={data.stock} 
                            onChange={(e) => setData('stock', e.target.value)}
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div className='space-y-1.5'>
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                            placeholder="Product description..." 
                            value={data.description} 
                            onChange={(e) => setData('description', e.target.value)}
                            rows={5}
                        />
                    </div>

                    {/* IMAGE */}
                    <div className='space-y-1.5'>
                        <Label htmlFor="image">Image URL (Optional)</Label>
                        <Input 
                            type="url"
                            placeholder="https://..." 
                            value={data.image} 
                            onChange={(e) => setData('image', e.target.value)}
                        />
                    </div>

                    {/* SUBMIT */}
                    <Button 
                        disabled={processing} 
                        onClick={handleUpdate} 
                        className="mt-4"
                    >
                        {processing ? 'Updating...' : 'Update Product'}
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}