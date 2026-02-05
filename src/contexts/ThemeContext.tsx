'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'mocha' | 'macchiato' | 'frappe' | 'latte';
type AccentColor = 'rosewater' | 'flamingo' | 'pink' | 'mauve' | 'red' | 'maroon' | 'peach' | 'yellow' | 'green' | 'teal' | 'sky' | 'sapphire' | 'blue' | 'lavender';

interface ThemeContextType {
    theme: Theme;
    accentColor: AccentColor;
    setTheme: (theme: Theme) => void;
    setAccentColor: (color: AccentColor) => void;
    backgroundEffect: boolean;
    toggleBackgroundEffect: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('mocha');
    const [accentColor, setAccentColorState] = useState<AccentColor>('mauve');
    const [backgroundEffect, setBackgroundEffect] = useState(false);

    // Load theme from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        const savedAccent = localStorage.getItem('accentColor') as AccentColor;
        const savedBgEffect = localStorage.getItem('backgroundEffect') === 'true';

        if (savedTheme) setThemeState(savedTheme);
        if (savedAccent) setAccentColorState(savedAccent);
        setBackgroundEffect(savedBgEffect);
    }, []);

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('data-accent', accentColor);
        document.documentElement.setAttribute('data-bg-effect', backgroundEffect.toString());
    }, [theme, accentColor, backgroundEffect]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const setAccentColor = (color: AccentColor) => {
        setAccentColorState(color);
        localStorage.setItem('accentColor', color);
    };

    const toggleBackgroundEffect = () => {
        const newValue = !backgroundEffect;
        setBackgroundEffect(newValue);
        localStorage.setItem('backgroundEffect', newValue.toString());
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                accentColor,
                setTheme,
                setAccentColor,
                backgroundEffect,
                toggleBackgroundEffect,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
