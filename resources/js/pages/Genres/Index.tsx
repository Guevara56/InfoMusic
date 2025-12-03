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
        title: 'Genres',
        href: '/Genres',
    },
];

interface Genres {
    id: number;
    name: string;
    genre: string;
    description: string;
}

interface PageProps {
    flash: {
        message?: string;
    };
    genres: Genres[];
}

export default function Index() {

    const { genres, flash } = usePage().props as PageProps;

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete a Genre - ${id} . ${name}`)) {
            destroy(route('genres.destroy', id));
        }

    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Genres" />
            <div className="m-4">
                <Link href={route('genres.create')}><Button>Create a Genre</Button></Link>
            </div>
            <div className="m-4">
                <div>
                    {flash.message && (
                        <Alert>
                            <CircleCheckBig className="text-green-500" />
                            <AlertTitle>Notification!</AlertTitle>
                            <AlertDescription>
                                {flash.message}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
            {genres.length > 0 && (
                <div className="m-4">
                    <Table>
                        <TableCaption>A list of your recent genres.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Genre</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {genres.map((genres) => (
                                <TableRow>
                                    <TableCell className="font-medium">{genres.id}</TableCell>
                                    <TableCell>{genres.name}</TableCell>
                                    <TableCell>{genres.genre}</TableCell>
                                    <TableCell>{genres.description}</TableCell>
                                    <TableCell className="text-center space-x-2">
                                        <Link href={route('genres.edit', genres.id)}><Button className='bg-slate-600 hover:bg-slate-700'>Edit</Button></Link>
                                        <Button disabled={processing} onClick={() => handleDelete(genres.id, genres.name)} className="bg-red-500 hover:bg-red-800">Delete</Button>
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
