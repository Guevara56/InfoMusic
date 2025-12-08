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
import { BookOpen,LayoutGrid, Boxes, Music, Disc3, UserPlus  , MicVocal, User, SquareActivity, Github  } from 'lucide-react';
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

const footerNavItems: NavItem[] = [
    {
        title: 'Github',
        href: 'https://github.com/Guevara56/InfoMusic',
        icon: Github,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
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
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
