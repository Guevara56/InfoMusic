import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Product Category',
        href: '/product-categories/create',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        icon: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('product-categories.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Product Category" />
            
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
                        <Label htmlFor="name">Name</Label>
                        <Input 
                            placeholder="Category Name (e.g., Vinyl, CD, T-Shirt)" 
                            value={data.name} 
                            onChange={(e) => setData('name', e.target.value)}
                            autoFocus
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                        <p className="text-gray-500 text-xs">
                            The slug will be generated automatically (e.g., "T-Shirt" → "t-shirt")
                        </p>
                    </div>

                    {/* ICON */}
                    <div className='space-y-1.5'>
                        <Label htmlFor="icon">Icon (Emoji)</Label>
                        <Input 
                            placeholder="💿 (paste an emoji)" 
                            value={data.icon} 
                            onChange={(e) => setData('icon', e.target.value)}
                            maxLength={2}
                        />
                        <p className="text-gray-500 text-xs">
                            Use an emoji to represent this category (e.g., 💿 💽 👕 📼)
                        </p>
                    </div>

                    {/* DESCRIPTION */}
                    <div className='space-y-1.5'>
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea 
                            placeholder="Describe this product category..."
                            value={data.description} 
                            onChange={(e) => setData('description', e.target.value)}
                            rows={3}
                        />
                    </div>

                    {/* PREVIEW */}
                    {data.name && (
                        <div className="p-3 bg-gray-100 rounded-md">
                            <p className="text-sm text-gray-600">
                                <strong>Preview:</strong> {data.icon} {data.name}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                <strong>Slug:</strong> {data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
                            </p>
                        </div>
                    )}

                    {/* SUBMIT */}
                    <Button 
                        disabled={processing} 
                        onClick={handleSubmit} 
                        className="mt-4"
                    >
                        {processing ? 'Creating...' : 'Add Category'}
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}