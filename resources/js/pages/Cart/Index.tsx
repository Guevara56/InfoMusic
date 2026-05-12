import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { CircleCheckBig, Trash2, ShoppingBag, Plus, Minus, ShoppingCart } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Cart', href: '/cart' },
];

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
    category: string | null;
    artist: string | null;
}

interface PageProps {
    flash: { message?: string };
    items: CartItem[];
    total: number;
}

export default function Index() {
    const { items, total, flash } = usePage().props as PageProps;
    const { processing, delete: destroy } = useForm();

    const handleRemove = (productId: number, name: string) => {
        if (confirm(`¿Eliminar "${name}" del carrito?`)) {
            destroy(route('cart.remove', productId));
        }
    };

    const handleClear = () => {
        if (confirm('¿Vaciar todo el carrito?')) {
            destroy(route('cart.clear'));
        }
    };

    const handleQuantity = (productId: number, quantity: number) => {
        router.patch(route('cart.update', productId), { quantity }, { preserveScroll: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Cart" />

            <div className="m-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <ShoppingCart className="h-6 w-6" />
                    My Cart
                </h1>
                {items.length > 0 && (
                    <Button
                        variant="outline"
                        className="text-red-500 border-red-300 hover:bg-red-50"
                        disabled={processing}
                        onClick={handleClear}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear Cart
                    </Button>
                )}
            </div>

            {flash.message && (
                <div className="m-4">
                    <Alert>
                        <CircleCheckBig className="text-green-500" />
                        <AlertTitle>Done!</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                </div>
            )}

            {items.length === 0 ? (
                /* ── CARRITO VACÍO ── */
                <div className="m-4 flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
                    <ShoppingBag className="h-16 w-16 mb-4 opacity-20" />
                    <p className="text-lg font-medium mb-2">Your cart is empty</p>
                    <p className="text-sm mb-6">Browse the shop and add some products!</p>
                    <Link href={route('products.index')}>
                        <Button>Go to Shop</Button>
                    </Link>
                </div>
            ) : (
                /* ── ITEMS + RESUMEN ── */
                <div className="m-4 grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Lista de productos */}
                    <div className="lg:col-span-2 space-y-3">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg bg-card">
                                {/* Icono producto */}
                                <div className="h-14 w-14 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                                    <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold truncate">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {item.artist && <span>{item.artist} · </span>}
                                        {item.category}
                                    </p>
                                    <p className="text-sm font-medium mt-1">{Number(item.price).toFixed(2)} €</p>
                                </div>

                                {/* Cantidad */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-7 w-7"
                                        disabled={item.quantity <= 1 || processing}
                                        onClick={() => handleQuantity(item.id, item.quantity - 1)}
                                    >
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-7 w-7"
                                        disabled={item.quantity >= 99 || processing}
                                        onClick={() => handleQuantity(item.id, item.quantity + 1)}
                                    >
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>

                                {/* Subtotal */}
                                <div className="text-right flex-shrink-0 w-20">
                                    <p className="font-bold">{Number(item.subtotal).toFixed(2)} €</p>
                                </div>

                                {/* Eliminar */}
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                                    disabled={processing}
                                    onClick={() => handleRemove(item.id, item.name)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Resumen del pedido */}
                    <div className="lg:col-span-1">
                        <div className="border rounded-lg p-5 bg-card space-y-4 sticky top-4">
                            <h2 className="text-lg font-bold">Order Summary</h2>

                            <div className="space-y-2 text-sm">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-muted-foreground">
                                        <span className="truncate mr-2">{item.name} × {item.quantity}</span>
                                        <span className="flex-shrink-0">{Number(item.subtotal).toFixed(2)} €</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-3 flex justify-between font-bold text-base">
                                <span>Total</span>
                                <span>{Number(total).toFixed(2)} €</span>
                            </div>

                            {/* Botón Stripe — deshabilitado por ahora */}
                            <Button className="w-full" size="lg" disabled>
                                Checkout (Coming soon)
                            </Button>

                            <p className="text-xs text-muted-foreground text-center">
                                Payment powered by Stripe — coming soon
                            </p>
                        </div>
                    </div>

                </div>
            )}
        </AppLayout>
    );
}