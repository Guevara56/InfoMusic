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
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {LayoutGrid, Boxes, Music, Disc3, UserPlus  , MicVocal, User, SquareActivity} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [

    {
        title: 'Users',
        href: '/users',
        icon: User,
    },
    {
        title: 'Products',
        href: '/products',
        icon: Boxes ,
    },
    {
        title: 'Artists',
        href: '/artists',
        icon: MicVocal ,
    },
    {
        title: 'Labels',
        href: '/labels',
        icon: Disc3,
    },
    {
        title: 'Songs',
        href: '/songs',
        icon: Music,
    },
    {
        title: 'Genres',
        href: '/genres',
        icon: SquareActivity ,
    },
    {
        title: 'Social Medias',
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
                            <Link href={dashboard()} prefetch>
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
