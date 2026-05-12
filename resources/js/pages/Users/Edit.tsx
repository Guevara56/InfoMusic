import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleAlert } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    description: string;
}

interface Props {
    user: User;
}

export default function Edit({ user }: Props) {

    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        description: user.description ?? '',
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('users.update', user.id));
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Edit a User', href: `/users/${user.id}/edit` }]}>
            <Head title="Update a User" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleUpdate} className="space-y-4">

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

                    <div className="gap-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="User Name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </div>

                    <div className="gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>

                    <div className="gap-1.5">
                        <Label htmlFor="password">New password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Leave in blank if you don't want to change the password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>

                    <div className="gap-1.5">
                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            placeholder="Repeat password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                    </div>

                    <div className="gap-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                    </div>

                    <Button disabled={processing} type="submit" className="mt-4">Update User</Button>
                </form>
            </div>
        </AppLayout>
    );
}