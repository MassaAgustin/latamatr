import styles from '../styles/Home.module.css';
import { useState } from 'react';
export default function ArrorRight({ onClick, hasNextPage }) {

    const [strokeWidth, setStrokeWidth] = useState(3);

    const handleMouseLeave = (e) => {
        setStrokeWidth(3);
    }

    const handleMouseEnter = (e) => {
        if(hasNextPage) setStrokeWidth(6);
    }

    const handleClick = () => {

        if (hasNextPage) {
            onClick(false);
        }
    }

    return (

        <btn className={`${styles.btnPaginador} ${styles.arrow} ${styles.right}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick()}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60px"
                height="80px"
                viewBox="0 0 50 80"
                className={styles.svgPaginator}
            >
                <path

                    fill="none"
                    stroke={hasNextPage ? "#ffc107" : "#e0e0e0"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={strokeWidth}
                    d="M0.375 0.375L45.63 38.087 0.375 75.8"
                />
            </svg>
        </btn>
    );
}