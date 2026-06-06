import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';

export default function EmailVerified() {

    useEffect(() => {
        const timer = setTimeout(() => {
            router.visit('/account');
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Head title="Correo verificado" />

            <div
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0a0a0f',
                    color: '#e8e8f0',
                }}
            >
                <div
                    style={{
                        textAlign: 'center',
                        maxWidth: 500,
                    }}
                >
                    <div
                        style={{
                            fontSize: 70,
                            marginBottom: 20,
                        }}
                    >
                        ✅
                    </div>

                    <h1
                        style={{
                            fontSize: 32,
                            marginBottom: 12,
                        }}
                    >
                        Correo verificado
                    </h1>

                    <p
                        style={{
                            color: '#999',
                            lineHeight: 1.6,
                        }}
                    >
                        Gracias por verificar tu dirección de correo electrónico.
                    </p>

                    <p
                        style={{
                            color: '#c8f050',
                            marginTop: 20,
                        }}
                    >
                        Serás redirigido automáticamente en 5 segundos...
                    </p>
                </div>
            </div>
        </>
    );
}