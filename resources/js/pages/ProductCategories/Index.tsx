import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleCheckBig } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product Categories',
        href: '/product-categories',
    },
];

interface Category {
    id: number;
    name: string;
    slug: string;
    icon: string;
    description: string;
    products_count?: number;
}

interface PageProps {
    flash: {
        message?: string;
    };
    categories: Category[];
}

export default function Index() {
    const { categories, flash } = usePage().props as PageProps;
    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete category - ${name}?`)) {
            destroy(route('product-categories.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Categories" />
            
            <div className="m-4">
                <Link href={route('product-categories.create')}>
                    <Button>Create Category</Button>
                </Link>
            </div>
            
            <div className="m-4">
                {flash.message && (
                    <Alert>
                        <CircleCheckBig className="text-green-500" />
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}
            </div>
            
            {categories.length > 0 && (
                <div className="m-4">
                    <Table>
                        <TableCaption>A list of product categories.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Icon</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Products</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">{category.id}</TableCell>
                                    <TableCell className="text-2xl">{category.icon || '📦'}</TableCell>
                                    <TableCell className="font-semibold">{category.name}</TableCell>
                                    <TableCell className="text-gray-600">{category.slug}</TableCell>
                                    <TableCell className="text-center">{category.products_count || 0}</TableCell>
                                    <TableCell className="text-center space-x-2">
                                        <Link href={route('product-categories.edit', category.id)}>
                                            <Button className='bg-slate-600 hover:bg-slate-700'>Edit</Button>
                                        </Link>
                                        <Button 
                                            disabled={processing} 
                                            onClick={() => handleDelete(category.id, category.name)} 
                                            className="bg-red-500 hover:bg-red-800"
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </AppLayout>
    );
}