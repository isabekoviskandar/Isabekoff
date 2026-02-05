'use client';

import { useEffect, useState } from 'react';
import styles from './ContributionGraph.module.css';

export default function ContributionGraph() {
    const [grid, setGrid] = useState<number[][]>([]);

    useEffect(() => {
        // Generate a random contribution graph for visual aesthetic
        // In a real app, this would fetch from GitHub GraphQL API
        const rows = 7;
        const cols = 20; // Last 20 weeks
        const newGrid = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0)
        );
        setGrid(newGrid);
    }, []);

    return (
        <div className={styles.graphContainer}>
            <div className={styles.graph}>
                {grid.map((row, i) => (
                    <div key={i} className={styles.row}>
                        {row.map((level, j) => (
                            <div
                                key={`${i}-${j}`}
                                className={styles.cell}
                                data-level={level}
                                style={{
                                    animationDelay: `${(i + j) * 0.05}s`
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className={styles.legend}>
                <span>Less</span>
                <div className={styles.cell} data-level="0" />
                <div className={styles.cell} data-level="1" />
                <div className={styles.cell} data-level="2" />
                <div className={styles.cell} data-level="3" />
                <div className={styles.cell} data-level="4" />
                <span>More</span>
            </div>
        </div>
    );
}
