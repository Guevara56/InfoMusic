import PublicLayout from '@/layouts/public-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { ShoppingBag, CreditCard, MapPin, User, ArrowLeft, Lock, AlertCircle } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// ── INTERFACES ────────────────────────────────────────────────
interface CartItem {
    id: number; name: string; price: number;
    quantity: number; subtotal: number;
    category: string | null; artist: string | null;
}

interface PageProps {
    items: CartItem[];
    total: number;
    prefill: { name: string; email: string };
    clientSecret: string;
    stripeKey: string;
    errors: Record<string, string>;
}

// ── CARD ELEMENT STYLES ───────────────────────────────────────
const cardStyle = {
    style: {
        base: {
            color: '#e8e8f0',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '14px',
            '::placeholder': { color: '#555' },
            backgroundColor: 'transparent',
        },
        invalid: { color: '#ef4444' },
    },
};

// ── FORMULARIO INTERNO (necesita acceso a stripe/elements) ────
function CheckoutForm({ items, total, prefill, errors: serverErrors, clientSecret }: Omit<PageProps, 'stripeKey'>) {
    const stripe = useStripe();
    const elements = useElements();

    const [form, setForm] = useState({
        name: prefill?.name ?? '',
        email: prefill?.email ?? '',
        phone: '',
        address: '',
        city: '',
        postal_code: '',
        country: 'España',
    });
    const [submitting, setSubmitting] = useState(false);
    const [cardError, setCardError] = useState<string | null>(null);
    const [paymentError, setPaymentError] = useState<string | null>(null);

    const set = (field: string, value: string) =>
        setForm(prev => ({ ...prev, [field]: value }));

    const inputStyle = (field: string): React.CSSProperties => ({
        width: '100%', padding: '10px 14px',
        background: serverErrors?.[field] ? 'rgba(239,68,68,0.05)' : '#0f0f1a',
        border: `1px solid ${serverErrors?.[field] ? '#ef4444' : '#2a2a3a'}`,
        borderRadius: 8, color: '#e8e8f0', fontSize: 14, outline: 'none',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setSubmitting(true);
        setPaymentError(null);

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) { setSubmitting(false); return; }

        // Confirmar el pago con Stripe
        const { error, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: cardElement,
                    billing_details: { name: form.name, email: form.email },
                },
            }
        );

        if (error) {
            setPaymentError(error.message ?? 'Error al procesar el pago.');
            setSubmitting(false);
            return;
        }

        if (paymentIntent?.status === 'succeeded') {
            // Guardar pedido en Laravel
            router.post('/checkout', {
                ...form,
                payment_intent_id: paymentIntent.id,
            }, {
                onError: () => setSubmitting(false),
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Datos personales */}
            <section style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 12, padding: '1.5rem' }}>
                <h2 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: 8, color: '#c8f050' }}>
                    <User size={15} /> Datos personales
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div>
                        <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>Nombre completo *</label>
                        <input style={inputStyle('name')} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Tu nombre" />
                        {serverErrors?.name && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{serverErrors.name}</p>}
                    </div>
                    <div>
                        <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>Email *</label>
                        <input style={inputStyle('email')} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="tu@email.com" />
                        {serverErrors?.email && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{serverErrors.email}</p>}
                    </div>
                    <div>
                        <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>Teléfono</label>
                        <input style={inputStyle('phone')} value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+34 600 000 000" />
                    </div>
                </div>
            </section>

            {/* Dirección */}
            <section style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 12, padding: '1.5rem' }}>
                <h2 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: 8, color: '#c8f050' }}>
                    <MapPin size={15} /> Dirección de envío
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                        <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>Dirección *</label>
                        <input style={inputStyle('address')} value={form.address} onChange={e => set('address', e.target.value)} placeholder="Calle, número, piso..." />
                        {serverErrors?.address && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{serverErrors.address}</p>}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                        <div>
                            <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>Ciudad *</label>
                            <input style={inputStyle('city')} value={form.city} onChange={e => set('city', e.target.value)} placeholder="Ciudad" />
                            {serverErrors?.city && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{serverErrors.city}</p>}
                        </div>
                        <div>
                            <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>Código postal *</label>
                            <input style={inputStyle('postal_code')} value={form.postal_code} onChange={e => set('postal_code', e.target.value)} placeholder="28001" />
                            {serverErrors?.postal_code && <p style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>{serverErrors.postal_code}</p>}
                        </div>
                        <div>
                            <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 5 }}>País *</label>
                            <input style={inputStyle('country')} value={form.country} onChange={e => set('country', e.target.value)} placeholder="España" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Pago con Stripe */}
            <section style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 12, padding: '1.5rem' }}>
                <h2 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: 8, color: '#c8f050' }}>
                    <CreditCard size={15} /> Pago con tarjeta
                </h2>

                <div style={{ padding: '12px 14px', background: '#0f0f1a', border: '1px solid #2a2a3a', borderRadius: 8, marginBottom: 12 }}>
                    <CardElement options={cardStyle} onChange={e => setCardError(e.error?.message ?? null)} />
                </div>

                {cardError && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#ef4444' }}>
                        <AlertCircle size={13} /> {cardError}
                    </div>
                )}

                {/* Tarjeta de prueba */}
                <div style={{ marginTop: 10, padding: '8px 12px', background: 'rgba(200,240,80,0.05)', border: '1px solid rgba(200,240,80,0.15)', borderRadius: 6, fontSize: 11, color: '#888' }}>
                    🧪 Modo test — usa la tarjeta <span style={{ color: '#c8f050', fontFamily: 'monospace' }}>4242 4242 4242 4242</span> · cualquier fecha futura · cualquier CVC
                </div>
            </section>

            {/* Error de pago */}
            {paymentError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, fontSize: 13, color: '#ef4444' }}>
                    <AlertCircle size={15} /> {paymentError}
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={submitting || !stripe}
                style={{
                    padding: '16px', background: submitting ? '#6a7a28' : '#c8f050',
                    color: '#0a0a0f', border: 'none', borderRadius: 10,
                    fontWeight: 700, fontSize: 16, cursor: submitting ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    transition: 'background 0.2s',
                }}
            >
                <Lock size={16} />
                {submitting ? 'Procesando pago...' : `Pagar ${Number(total).toFixed(2)} €`}
            </button>

            <p style={{ fontSize: 11, color: '#444', textAlign: 'center' }}>
                Pago seguro con Stripe · Simulación de compra
            </p>
        </form>
    );
}

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────
export default function Index() {
    const { items, total, prefill, clientSecret, stripeKey, errors } = usePage().props as unknown as PageProps;

    const stripePromise = loadStripe(stripeKey);

    return (
        <PublicLayout>
            <Head title="Checkout — InfoMusic" />

            <a href="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#666', textDecoration: 'none', fontSize: 13, marginBottom: '2rem' }}>
                <ArrowLeft size={14} /> Volver al carrito
            </a>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2.5rem', alignItems: 'start' }}>

                {/* Formulario */}
                <div>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 900, marginBottom: '2rem' }}>
                        Datos del pedido
                    </h1>
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutForm
                            items={items}
                            total={total}
                            prefill={prefill}
                            errors={errors}
                            clientSecret={clientSecret}
                        />
                    </Elements>
                </div>

                {/* Resumen sticky */}
                <div style={{ position: 'sticky', top: 80 }}>
                    <div style={{ background: '#13131f', border: '1px solid #1e1e2e', borderRadius: 14, padding: '1.5rem' }}>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.2rem' }}>Tu pedido</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: '1.2rem' }}>
                            {items.map(item => (
                                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 6, background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <ShoppingBag size={16} color="#2a2a4a" />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                                        <div style={{ fontSize: 11, color: '#555' }}>{item.artist} · x{item.quantity}</div>
                                    </div>
                                    <div style={{ fontSize: 13, fontWeight: 600, flexShrink: 0 }}>{Number(item.subtotal).toFixed(2)} €</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ borderTop: '1px solid #1e1e2e', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 700 }}>Total</span>
                            <span style={{ fontWeight: 900, fontSize: '1.3rem', color: '#c8f050', fontFamily: 'Playfair Display, serif' }}>
                                {Number(total).toFixed(2)} €
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}