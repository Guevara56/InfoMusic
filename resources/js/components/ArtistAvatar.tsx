interface ArtistAvatarProps {
    avatar: string | null;
    name: string;
    size?: number;
    style?: React.CSSProperties;
}
 
export function ArtistAvatar({ avatar, name, size = 72, style }: ArtistAvatarProps) {
    const isExternal = avatar?.startsWith('http');
    const isStorage  = avatar && !isExternal;
    const src = isExternal ? avatar : isStorage ? `/storage/${avatar}` : '/images/default-artist.svg';
 
    return (
        <div style={{
            width: size, height: size, borderRadius: '50%',
            overflow: 'hidden', flexShrink: 0,
            background: 'linear-gradient(135deg, #1e1e3a, #2a2a5a)',
            ...style,
        }}>
            <img
                src={src!}
                alt={name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { (e.target as HTMLImageElement).src = '/images/default-artist.svg'; }}
            />
        </div>
    );
}
