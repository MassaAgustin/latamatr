import styles from '../styles/Home.module.css';
import { useState } from 'react';
export default function ArrowLeft({ onClick, hasPrevPage }) {

    const [strokeWidth, setStrokeWidth] = useState(3);

    const handleMouseLeave = (e) => {
        setStrokeWidth(3);
    }

    const handleMouseEnter = (e) => {
        if (hasPrevPage) setStrokeWidth(6);
    }

    const handleClick = () => {

        if (hasPrevPage) {
            onClick(true);
        }
    }

    return (
        <btn
            className={`${styles.btnPaginador} ${hasPrevPage ? styles.btnClickeable : styles.btnUnClickeable} ${styles.arrow} ${styles.left}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick()}
        >
            <svg className={styles.svgPaginator} width="60px" height="80px" viewBox="0 0 50 80">
                <path
                    className={styles.path}
                    fill="none"
                    stroke={hasPrevPage ? "#ffc107" : "#e0e0e0"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={strokeWidth}
                    d="M45.63 75.8L0.375 38.087 45.63 0.375"
                />
            </svg>
        </btn>

    );
}