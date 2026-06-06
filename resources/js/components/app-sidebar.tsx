import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, home } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {LayoutGrid, Boxes, Music, Disc3, UserPlus  , MicVocal, User, SquareActivity} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [

    {
        title: 'Usuarios',
        href: '/users',
        icon: User,
    },
    {
        title: 'Productos',
        href: '/products',
        icon: Boxes ,
    },
    {
        title: 'Artistas',
        href: '/artists',
        icon: MicVocal ,
    },
    {
        title: 'Discográficas',
        href: '/labels',
        icon: Disc3,
    },
    {
        title: 'Canciones',
        href: '/songs',
        icon: Music,
    },
    {
        title: 'Generos',
        href: '/genres',
        icon: SquareActivity ,
    },
    {
        title: 'Redes Sociales',
        href: '/social-medias',
        icon: UserPlus,
    },
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },

];


export function AppSidebar() {
    return (
        <Sidebar collapsible="offcanvas" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={home()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
