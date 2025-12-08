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
        href: '/songs',
    },
];

interface Artist {
    id: number;
    name: string;
}

interface Genre {
    id: number;
    name: string;
}

interface Song {
    id: number;
    title: string;
    duration: string;
    release_year: string;
    artist: Artist;
    genres: Genre[];
}

interface PageProps {
    flash: {
        message?: string;
    };
    songs: Song[];
}

export default function Index() {
    const { songs, flash } = usePage().props as PageProps;
    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Do you want to delete song - ${title}?`)) {
            destroy(route('songs.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Songs" />
            
            <div className="m-4">
                <Link href={route('songs.create')}>
                    <Button>Create Song</Button>
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
            
            {songs.length > 0 && (
                <div className="m-4">
                    <Table>
                        <TableCaption>A list of your songs.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Artist</TableHead>
                                <TableHead>Genres</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Year</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {songs.map((song) => (
                                <TableRow key={song.id}>
                                    <TableCell className="font-medium">{song.id}</TableCell>
                                    <TableCell className="font-semibold">{song.title}</TableCell>
                                    <TableCell>{song.artist.name}</TableCell>
                                    <TableCell>
                                        {song.genres.length > 0 
                                            ? song.genres.map(g => g.name).join(', ')
                                            : 'N/A'
                                        }
                                    </TableCell>
                                    <TableCell>{song.duration || 'N/A'}</TableCell>
                                    <TableCell>{song.release_year || 'N/A'}</TableCell>
                                    <TableCell className="text-center space-x-2">
                                        <Link href={route('songs.edit', song.id)}>
                                            <Button className='bg-slate-600 hover:bg-slate-700'>Edit</Button>
                                        </Link>
                                        <Button 
                                            disabled={processing} 
                                            onClick={() => handleDelete(song.id, song.title)} 
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