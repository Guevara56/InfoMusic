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
        title: 'Social Media',
        href: '/social-medias',
    },
];

interface Artist {
    id: number;
    name: string;
}

interface SocialMedia {
    id: number;
    platform: string;
    url: string;
    followers: string;
    artist: Artist;
}

interface PageProps {
    flash: {
        message?: string;
    };
    socialMedias: SocialMedia[];
}

export default function Index() {
    const { socialMedias, flash } = usePage().props as PageProps;
    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, platform: string) => {
        if (confirm(`Do you want to delete ${platform}?`)) {
            destroy(route('social-medias.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Social Media" />
            
            <div className="m-4">
                <Link href={route('social-medias.create')}>
                    <Button>Create Social Media</Button>
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
            
            {socialMedias.length > 0 && (
                <div className="m-4">
                    <Table>
                        <TableCaption>A list of social media accounts.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Platform</TableHead>
                                <TableHead>Artist</TableHead>
                                <TableHead>URL</TableHead>
                                <TableHead>Followers</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {socialMedias.map((sm) => (
                                <TableRow key={sm.id}>
                                    <TableCell className="font-medium">{sm.id}</TableCell>
                                    <TableCell className="font-semibold">{sm.platform}</TableCell>
                                    <TableCell>{sm.artist.name}</TableCell>
                                    <TableCell>
                                        <a 
                                            href={sm.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            {sm.url.length > 40 ? sm.url.substring(0, 40) + '...' : sm.url}
                                        </a>
                                    </TableCell>
                                    <TableCell>{sm.followers || 'N/A'}</TableCell>
                                    <TableCell className="text-center space-x-2">
                                        <Link href={route('social-medias.edit', sm.id)}>
                                            <Button className='bg-slate-600 hover:bg-slate-700'>Edit</Button>
                                        </Link>
                                        <Button 
                                            disabled={processing} 
                                            onClick={() => handleDelete(sm.id, sm.platform)} 
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