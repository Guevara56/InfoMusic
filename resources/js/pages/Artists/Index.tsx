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
        title: 'Artists',
        href: '/artists',
    },
];

interface Label {
    id: number;
    name: string;
}

interface Artist {
    id: number;
    name: string;
    bio: string;
    country: string;
    formed_year: string;
    avatar: string;
    label: Label | null;
}

interface PageProps {
    flash: {
        message?: string;
    };
    artists: Artist[];
}

export default function Index() {
    const { artists, flash } = usePage().props as PageProps;
    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete artist - ${name}?`)) {
            destroy(route('artists.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Artists" />
            <div className="m-4">
                <Link href={route('artists.create')}>
                    <Button>Create Artist</Button>
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
            {artists.length > 0 && (
                <div className="m-4">
                    <Table>
                        <TableCaption>A list of your artists.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Country</TableHead>
                                <TableHead>Year</TableHead>
                                <TableHead>Label</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {artists.map((artist) => (
                                <TableRow key={artist.id}>
                                    <TableCell className="font-medium">{artist.id}</TableCell>
                                    <TableCell>{artist.name}</TableCell>
                                    <TableCell>{artist.country || 'N/A'}</TableCell>
                                    <TableCell>{artist.formed_year || 'N/A'}</TableCell>
                                    <TableCell>{artist.label?.name || 'Independent'}</TableCell>
                                    <TableCell className="text-center space-x-2">
                                        <Link href={route('artists.edit', artist.id)}>
                                            <Button className='bg-slate-600 hover:bg-slate-700'>Edit</Button>
                                        </Link>
                                        <Button 
                                            disabled={processing} 
                                            onClick={() => handleDelete(artist.id, artist.name)} 
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