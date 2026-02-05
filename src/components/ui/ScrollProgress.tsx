'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;

            setScrollProgress(Number(scroll));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '3px',
                zIndex: 9999,
                pointerEvents: 'none',
            }}
        >
            <div
                style={{
                    height: '100%',
                    background: 'var(--accent)',
                    width: `${scrollProgress * 100}%`,
                    transition: 'width 0.1s ease-out',
                    boxShadow: '0 0 10px var(--accent)',
                }}
            />
        </div>
    );
}
