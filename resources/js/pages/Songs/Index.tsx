import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleCheckBig, Search } from 'lucide-react';
import { useState, useCallback } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Songs', href: '/songs' }];

interface Artist { id: number; name: string; }
interface Genre  { id: number; name: string; }
interface Song   { id: number; title: string; duration: string; release_year: string; artist: Artist; genres: Genre[]; }

interface PaginationLink { url: string | null; label: string; active: boolean; }
interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface PageProps {
    flash:  { message?: string };
    songs:  Paginated<Song>;
    search: string;
}

export default function Index() {
    const { songs, flash, search: initialSearch } = usePage().props as PageProps;
    const { processing, delete: destroy } = useForm();
    const [searchValue, setSearchValue] = useState(initialSearch ?? '');

    const handleSearch = useCallback((value: string) => {
        setSearchValue(value);
        router.get(route('songs.index'), { search: value }, {
            preserveState: true,
            replace: true,
        });
    }, []);

    const handleDelete = (id: number, title: string) => {
        if (confirm(`Do you want to delete song - ${title}?`)) {
            destroy(route('songs.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Songs" />

            <div className="m-4 flex items-center justify-between gap-4">
                <Link href={route('songs.create')}>
                    <Button>Create Song</Button>
                </Link>
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        className="pl-9"
                        placeholder="Search by title, artist or genre..."
                        value={searchValue}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            </div>

            {flash.message && (
                <div className="m-4">
                    <Alert>
                        <CircleCheckBig className="text-green-500" />
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                </div>
            )}

            <div className="m-4 text-sm text-muted-foreground">
                {songs.total} song{songs.total !== 1 ? 's' : ''} found
                {searchValue && <> for &ldquo;{searchValue}&rdquo;</>}
            </div>

            {songs.data.length > 0 ? (
                <>
                    <div className="m-4">
                        <Table>
                            <TableCaption>
                                Page {songs.current_page} of {songs.last_page} — {songs.total} total songs
                            </TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[60px]">ID</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Artist</TableHead>
                                    <TableHead>Genres</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead>Year</TableHead>
                                    <TableHead className="text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {songs.data.map((song) => (
                                    <TableRow key={song.id}>
                                        <TableCell className="font-medium">{song.id}</TableCell>
                                        <TableCell className="font-semibold">{song.title}</TableCell>
                                        <TableCell>{song.artist?.name ?? 'N/A'}</TableCell>
                                        <TableCell>
                                            {song.genres.length > 0
                                                ? song.genres.map((g) => g.name).join(', ')
                                                : 'N/A'}
                                        </TableCell>
                                        <TableCell>{song.duration || 'N/A'}</TableCell>
                                        <TableCell>{song.release_year || 'N/A'}</TableCell>
                                        <TableCell className="text-center space-x-2">
                                            <Link href={route('songs.edit', song.id)}>
                                                <Button className="bg-slate-600 hover:bg-slate-700">Edit</Button>
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

                    {/* Pagination */}
                    {songs.last_page > 1 && (
                        <div className="m-4 flex items-center justify-center gap-1 flex-wrap">
                            {songs.links.map((link, i) => {
                                if (!link.url) {
                                    return (
                                        <span
                                            key={i}
                                            className="px-3 py-1 text-sm text-muted-foreground"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                }
                                return (
                                    <Link key={i} href={link.url}>
                                        <Button
                                            variant={link.active ? 'default' : 'outline'}
                                            size="sm"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </>
            ) : (
                <div className="m-4 text-center text-muted-foreground py-16">
                    {searchValue
                        ? `No songs found matching "${searchValue}". Try a different search.`
                        : 'No songs yet. Create your first one!'}
                </div>
            )}
        </AppLayout>
    );
}