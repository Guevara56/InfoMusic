import { Head, Link } from '@inertiajs/react';

interface Artist {
    id: number;
    name: string;
    country: string;
    genre: {
        name: string;
    };
}

interface Props {
    artists: Artist[];
}

export default function Index({ artists }: Props) {
    return (
        <>
            <Head title="Artistas" />
            
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Artistas</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {artists.map(artist => (
                        <Link
                            key={artist.id}
                            href={`/artists/${artist.id}`}
                            className="bg-white rounded-lg shadow p-6 hover:shadow-xl transition"
                        >
                            <h3 className="text-xl font-semibold">{artist.name}</h3>
                            <p className="text-gray-600">{artist.genre.name}</p>
                            <p className="text-sm text-gray-500">{artist.country}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}