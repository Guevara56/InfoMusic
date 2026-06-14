import { Music2 } from 'lucide-react';

export default function AppLogo() {
    return (
        <>
            <div
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: '#c8f050',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}
            >
                <Music2 size={17} color="#0a0a0f" strokeWidth={2.5} />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span
                    className="truncate leading-tight"
                    style={{
                        fontFamily: 'Playfair Display, serif',
                        fontWeight: 700,
                        fontSize: '1rem',
                        letterSpacing: '-0.01em',
                    }}
                >
                    InfoMusic
                </span>
            </div>
        </>
    );
}