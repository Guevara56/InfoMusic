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
        title: 'Users',
        href: '/Users',
    },
];

interface Users {
    id: number;
    name: string;
    email: string;
    description: string;
}

interface PageProps {
    flash: {
        message?: string;
    };
    users: Users[];
}

export default function Index() {

    const { users, flash } = usePage().props as PageProps;

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Do you want to delete a User - ${id} . ${name}`)) {
            destroy(route('users.destroy', id));
        }

    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="m-4">
                <Link href={route('users.create')}><Button>Create a User</Button></Link>
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
            {users.length > 0 && (
                <div className="m-4">
                    <Table>
                        <TableCaption>A list of your recent users.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((users) => (
                                <TableRow>
                                    <TableCell className="font-medium">{users.id}</TableCell>
                                    <TableCell>{users.name}</TableCell>
                                    <TableCell>{users.email}</TableCell>
                                    <TableCell>{users.description}</TableCell>
                                    <TableCell className="text-center space-x-2">
                                        <Link href={route('users.edit', users.id)}><Button className='bg-slate-600 hover:bg-slate-700'>Edit</Button></Link>
                                        <Button disabled={processing} onClick={() => handleDelete(users.id, users.name)} className="bg-red-500 hover:bg-red-800">Delete</Button>
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
