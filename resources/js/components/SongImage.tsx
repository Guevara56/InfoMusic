interface SongImageProps {
    image: string | null;
    title: string;
    size?: number;
    style?: React.CSSProperties;
}
 
export function SongImage({ image, title, size = 48, style }: SongImageProps) {
    const isExternal = image?.startsWith('http');
    const src = isExternal ? image : image ? `/storage/${image}` : '/images/default-song.svg';
 
    return (
        <div style={{
            width: size, height: size, borderRadius: 8, overflow: 'hidden', flexShrink: 0,
            background: '#1a1a2e', ...style,
        }}>
            <img
                src={src!}
                alt={title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { (e.target as HTMLImageElement).src = '/images/default-song.svg'; }}
            />
        </div>
    );
}