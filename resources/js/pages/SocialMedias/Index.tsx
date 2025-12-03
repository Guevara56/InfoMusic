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
        title: 'SocialMedias',
        href: '/SocialMedias',
    },
];

interface SocialMedias {
    id: number;
    name: string;
    genre: string;
    description: string;
}

interface PageProps {
    flash: {
        message?: string;
    };
    socialmedias: SocialMedias[];
}

export default function Index() {

    const { socialmedias, flash } = usePage().props as PageProps;

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete a Social Media - ${id} . ${name}`)) {
            destroy(route('socialmedias.destroy', id));
        }

    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="SocialMedias" />
            <div className="m-4">
                <Link href={route('socialmedias.create')}><Button>Create a Social Media</Button></Link>
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
            {socialmedias.length > 0 && (
                <div className="m-4">
                    <Table>
                        <TableCaption>A list of your recent socialmedias.</TableCaption>
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
                            {socialmedias.map((socialmedias) => (
                                <TableRow>
                                    <TableCell className="font-medium">{socialmedias.id}</TableCell>
                                    <TableCell>{socialmedias.name}</TableCell>
                                    <TableCell>{socialmedias.genre}</TableCell>
                                    <TableCell>{socialmedias.description}</TableCell>
                                    <TableCell className="text-center space-x-2">
                                        <Link href={route('socialmedias.edit', socialmedias.id)}><Button className='bg-slate-600 hover:bg-slate-700'>Edit</Button></Link>
                                        <Button disabled={processing} onClick={() => handleDelete(socialmedias.id, socialmedias.name)} className="bg-red-500 hover:bg-red-800">Delete</Button>
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
