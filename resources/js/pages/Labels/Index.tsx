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
        title: 'Labels',
        href: '/labels',
    },
];

interface Label {
    id: number;
    name: string;
    country: string;
    description: string;
    logo: string;
    website: string;
    artists_count?: number;
}

interface PageProps {
    flash: {
        message?: string;
    };
    labels: Label[];
}

export default function Index() {
    const { labels, flash } = usePage().props as PageProps;
    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete label - ${name}?`)) {
            destroy(route('labels.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Labels (Record Labels)" />
            
            <div className="m-4">
                <Link href={route('labels.create')}>
                    <Button>Create Label</Button>
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
            
            {labels.length > 0 && (
                <div className="m-4">
                    <Table>
                        <TableCaption>A list of record labels.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Country</TableHead>
                                <TableHead>Artists</TableHead>
                                <TableHead>Website</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {labels.map((label) => (
                                <TableRow key={label.id}>
                                    <TableCell className="font-medium">{label.id}</TableCell>
                                    <TableCell className="font-semibold">{label.name}</TableCell>
                                    <TableCell>{label.country || 'N/A'}</TableCell>
                                    <TableCell className="text-center">{label.artists_count || 0}</TableCell>
                                    <TableCell>
                                        {label.website ? (
                                            <a 
                                                href={label.website} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Visit
                                            </a>
                                        ) : 'N/A'}
                                    </TableCell>
                                    <TableCell className="text-center space-x-2">
                                        <Link href={route('labels.edit', label.id)}>
                                            <Button className='bg-slate-600 hover:bg-slate-700'>Edit</Button>
                                        </Link>
                                        <Button 
                                            disabled={processing} 
                                            onClick={() => handleDelete(label.id, label.name)} 
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