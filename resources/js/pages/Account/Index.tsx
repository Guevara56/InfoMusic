import PublicLayout from '@/layouts/public-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { User, Mail, Shield, Package } from 'lucide-react';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface Order {
  id: number;
  total: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

interface Props {
  user: {
    name: string;
    email: string;
    role: string;
    verified: boolean;
    description?: string;
  };
  orders: Order[];
}

export default function Account() {
  const { user, orders } = usePage<Props>().props;

  return (
    <PublicLayout>
      <Head title="Mi cuenta" />

      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            marginBottom: '2rem',
          }}
        >
          Mi cuenta
        </h1>

        <div
          style={{
            background: '#13131f',
            border: '1px solid #1e1e2e',
            borderRadius: 14,
            padding: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <User size={18} />
            <strong>{user.name}</strong>
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <Mail size={18} />
            {user.email}
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <Shield size={18} />
            {user.verified
              ? 'Correo verificado'
              : 'Correo sin verificar'}
          </div>

          <div
            style={{
              display: 'flex',
              gap: 10,
              marginTop: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/settings/profile">
              Editar perfil
            </Link>

            <Link href="/settings/password">
              Cambiar contraseña
            </Link>

            <Link href="/settings/two-factor">
              Autenticación 2FA
            </Link>
          </div>
        </div>

        <h2
          style={{
            fontSize: '1.3rem',
            marginBottom: '1rem',
          }}
        >
          Historial de pedidos
        </h2>

        {!orders.length ? (
          <div
            style={{
              background: '#13131f',
              padding: '1.5rem',
              borderRadius: 12,
            }}
          >
            Todavía no has realizado ningún pedido.
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {orders.map(order => (
              <div
                key={order.id}
                style={{
                  background: '#13131f',
                  border: '1px solid #1e1e2e',
                  borderRadius: 12,
                  padding: '1rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <strong>
                      Pedido #{order.id}
                    </strong>

                    <Link
                      href={`/account/orders/${order.id}`}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(4px)';
                        e.currentTarget.style.color = '#d7ff5f';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0px)';
                        e.currentTarget.style.color = '#c8f050';
                      }}
                      style={{
                        display: 'inline-block',
                        marginLeft: 12,
                        color: '#c8f050',
                        textDecoration: 'none',
                        fontSize: 13,
                        fontWeight: 600,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      Ver detalles →
                    </Link>


                    <div
                      style={{
                        color: '#666',
                        fontSize: 13,
                        marginTop: 4,
                      }}
                    >
                      {order.created_at}
                    </div>
                  </div>

                  <div
                    style={{
                      textAlign: 'right',
                    }}
                  >
                    <div
                      style={{
                        color: '#c8f050',
                        fontWeight: 700,
                      }}
                    >
                      {Number(order.total).toFixed(2)} €
                    </div>

                    <div
                      style={{
                        fontSize: 13,
                        color: '#888',
                      }}
                    >
                      {order.status}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 14,
                    borderTop: '1px solid #1e1e2e',
                    paddingTop: 10,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      marginBottom: 10,
                      color: '#888',
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    <Package size={14} />
                    Productos comprados
                  </div>

                  {order.items.map(item => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '6px 0',
                        fontSize: 13,
                      }}
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>

                      <span style={{ color: '#c8f050' }}>
                        {Number(item.subtotal).toFixed(2)} €
                      </span>
                    </div>


                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}