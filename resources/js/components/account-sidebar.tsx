import { Link } from '@inertiajs/react';

export default function AccountSidebar() {
    return (
        <div className="space-y-2">
            <Link href="/account">Resumen</Link>
            <Link href="/account/profile">Perfil</Link>
            <Link href="/account/shipping">Direcciones</Link>
            <Link href="/account/security">Seguridad</Link>
        </div>
    );
}