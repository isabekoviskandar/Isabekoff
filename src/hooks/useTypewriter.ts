'use client';

import { useState, useEffect } from 'react';

export function useTypewriter(text: string | string[], speed: number = 50, pauseTime: number = 2000) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [textIndex, setTextIndex] = useState(0); // If array of strings

    useEffect(() => {
        const currentText = Array.isArray(text) ? text[textIndex] : text;

        const handleType = () => {
            if (!isDeleting) {
                // Typing forward
                if (displayText.length < currentText.length) {
                    setDisplayText(currentText.slice(0, displayText.length + 1));
                } else {
                    // Finished typing
                    if (Array.isArray(text) && text.length > 1) {
                        setTimeout(() => setIsDeleting(true), pauseTime);
                    }
                }
            } else {
                // Deleting
                if (displayText.length > 0) {
                    setDisplayText(currentText.slice(0, displayText.length - 1));
                } else {
                    // Finished deleting
                    setIsDeleting(false);
                    // Move to next string if array
                    if (Array.isArray(text)) {
                        setTextIndex((prev) => (prev + 1) % text.length);
                    }
                }
            }
        };

        const timer = setTimeout(handleType, isDeleting ? speed / 2 : speed);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, text, textIndex, speed, pauseTime]);

    return displayText;
}
