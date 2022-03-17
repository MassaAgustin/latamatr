import styles from '../styles/Home.module.css';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';
export default function Paginador({ onClick, hasPrevPage, hasNextPage }) {

    return (
        <div className={styles.paginador}>
            <ArrowLeft onClick={onClick} hasPrevPage={hasPrevPage} />
            <ArrowRight onClick={onClick} hasNextPage={hasNextPage} />
        </div>
    )

}