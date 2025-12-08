import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleAlert } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
    icon: string;
    description: string;
}

interface Props {
    category: Category;
}

export default function Edit() {
    const { category } = usePage().props as Props;

    const { data, setData, put, processing, errors } = useForm({
        name: category.name || '',
        icon: category.icon || '',
        description: category.description || '',
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('product-categories.update', category.id));
    }

    return (
        <AppLayout breadcrumbs={[{title: 'Edit Category', href: `/product-categories/${category.id}/edit`}]}>
            <Head title="Update Product Category" />
            
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

                    {/* MOSTRAR SLUG ACTUAL */}
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <p className="text-sm">
                            <strong>Current slug:</strong> 
                            <span className="ml-2 text-blue-600 font-mono">{category.slug}</span>
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                            The slug will be updated automatically if you change the name
                        </p>
                    </div>

                    {/* NAME */}
                    <div className='space-y-1.5'>
                        <Label htmlFor="name">Name</Label>
                        <Input 
                            placeholder="Category Name" 
                            value={data.name} 
                            onChange={(e) => setData('name', e.target.value)}
                            autoFocus
                        />
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

                    {/* PREVIEW DEL NUEVO SLUG */}
                    {data.name !== category.name && (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                            <p className="text-sm">
                                <strong>New slug will be:</strong> 
                                <span className="ml-2 text-yellow-700 font-mono">
                                    {data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
                                </span>
                            </p>
                        </div>
                    )}

                    {/* SUBMIT */}
                    <Button 
                        disabled={processing} 
                        onClick={handleUpdate} 
                        className="mt-4"
                    >
                        {processing ? 'Updating...' : 'Update Category'}
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}