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
        title: 'Songs',
        href: '/Songs',
    },
];

interface Songs {
    id: number;
    name: string;
    genre: string;
    description: string;
}

interface PageProps {
    flash: {
        message?: string;
    };
    songs: Songs[];
}

export default function Index() {

    const { songs, flash } = usePage().props as PageProps;

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete a Song - ${id} . ${name}`)) {
            destroy(route('songs.destroy', id));
        }

    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Songs" />
            <div className="m-4">
                <Link href={route('songs.create')}><Button>Create a Song</Button></Link>
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
            {songs.length > 0 && (
                <div className="m-4">
                    <Table>
                        <TableCaption>A list of your recent songs.</TableCaption>
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
                            {songs.map((songs) => (
                                <TableRow>
                                    <TableCell className="font-medium">{songs.id}</TableCell>
                                    <TableCell>{songs.name}</TableCell>
                                    <TableCell>{songs.genre}</TableCell>
                                    <TableCell>{songs.description}</TableCell>
                                    <TableCell className="text-center space-x-2">
                                        <Link href={route('songs.edit', songs.id)}><Button className='bg-slate-600 hover:bg-slate-700'>Edit</Button></Link>
                                        <Button disabled={processing} onClick={() => handleDelete(songs.id, songs.name)} className="bg-red-500 hover:bg-red-800">Delete</Button>
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
