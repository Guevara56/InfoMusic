import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    // Datos de ejemplo
    const stats = [
        {
            title: 'Total Canciones',
            value: '1,234',
            change: '+12%',
            icon: '🎵',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            title: 'Artistas',
            value: '456',
            change: '+8%',
            icon: '🎤',
            color: 'from-purple-500 to-pink-500'
        },
        {
            title: 'Álbumes',
            value: '789',
            change: '+15%',
            icon: '💿',
            color: 'from-orange-500 to-red-500'
        },
    ];

    const recentActivity = [
        { action: 'Nueva canción agregada', item: '"Bohemian Rhapsody"', time: 'Hace 2 horas' },
        { action: 'Artista actualizado', item: 'Queen', time: 'Hace 5 horas' },
        { action: 'Álbum creado', item: '"A Night at the Opera"', time: 'Hace 1 día' },
        { action: 'Playlist modificada', item: '"Rock Clásico"', time: 'Hace 2 días' },
    ];

    const topSongs = [
        { title: 'Bohemian Rhapsody', artist: 'Queen', plays: '2.1M' },
        { title: 'Stairway to Heaven', artist: 'Led Zeppelin', plays: '1.8M' },
        { title: 'Hotel California', artist: 'Eagles', plays: '1.5M' },
        { title: 'Imagine', artist: 'John Lennon', plays: '1.3M' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                {/* Stats Cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-sidebar-border dark:bg-sidebar"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {stat.title}
                                    </p>
                                    <h3 className="mt-2 text-3xl font-bold">
                                        {stat.value}
                                    </h3>
                                    <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                                        {stat.change} vs mes anterior
                                    </p>
                                </div>
                                <div className={`rounded-lg bg-gradient-to-br ${stat.color} p-3 text-3xl`}>
                                    {stat.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Recent Activity */}
                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                        <h2 className="mb-4 text-xl font-bold">Actividad Reciente</h2>
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 border-b border-sidebar-border/50 pb-3 last:border-0"
                                >
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                        •
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{activity.action}</p>
                                        <p className="text-sm text-muted-foreground">{activity.item}</p>
                                        <p className="mt-1 text-xs text-muted-foreground">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Songs */}
                    <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                        <h2 className="mb-4 text-xl font-bold">Canciones Más Populares</h2>
                        <div className="space-y-3">
                            {topSongs.map((song, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 rounded-lg bg-sidebar/50 p-3 transition-colors hover:bg-sidebar-accent dark:bg-sidebar-accent/10"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-pink-500 text-lg font-bold text-white">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium">{song.title}</p>
                                        <p className="text-sm text-muted-foreground">{song.artist}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">{song.plays}</p>
                                        <p className="text-xs text-muted-foreground">plays</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-sidebar">
                    <h2 className="mb-4 text-xl font-bold">Acciones Rápidas</h2>
                    <div className="grid gap-3 md:grid-cols-4">
                        {[
                            { label: 'Agregar Canción', icon: '➕', color: 'bg-green-500' },
                            { label: 'Nuevo Artista', icon: '🎤', color: 'bg-blue-500' },
                            { label: 'Crear Álbum', icon: '💿', color: 'bg-purple-500' },
                            { label: 'Ver Reportes', icon: '📊', color: 'bg-orange-500' },
                        ].map((action, index) => (
                            <button
                                key={index}
                                className="flex flex-col items-center gap-2 rounded-lg border border-sidebar-border/70 bg-sidebar/30 p-4 transition-all hover:scale-105 hover:bg-sidebar-accent dark:border-sidebar-border"
                            >
                                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${action.color} text-2xl`}>
                                    {action.icon}
                                </div>
                                <span className="text-sm font-medium">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
