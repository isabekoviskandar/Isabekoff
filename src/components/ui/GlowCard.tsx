'use client';

import React, { useRef, useEffect, useState } from 'react';

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

export default function GlowCard({
    children,
    className = '',
    glowColor = 'var(--accent)',
    ...props
}: GlowCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden ${className}`}
            style={{
                ...props.style,
                // @ts-ignore
                '--x': `${position.x}px`,
                '--y': `${position.y}px`,
                '--opacity': opacity,
                '--glow-color': glowColor,
            }}
            {...props}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
                style={{
                    opacity: opacity,
                    background: `radial-gradient(600px circle at var(--x) var(--y), var(--glow-color), transparent 40%)`,
                    zIndex: 0,
                }}
            />
            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
}
