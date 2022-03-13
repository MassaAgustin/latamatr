import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { obtenerJugador } from '../lib/servicios/mir4';

export default function CartaJugador(props) {

    const { jugador, index, ...rest } = props;

    const obtenerImagen = (clase) => {

        switch (clase) {
            case "Ballestera":
                return '/crossbow.webp';
            case "Taoista":
                return '/conjurer.png';
            case "Guerrero":
                return '/warrior.png';
            case "Lancero":
                return '/hunter.png';
            case "Mago":
            default:
                return '/mage.png';
        }
    }

    return (
        <div className={styles.card}>
            <h2><mark>{jugador.nickName}</mark></h2>
            <Image src={obtenerImagen(jugador.clase)} width={442} height={705} alt='Imagen del jugador' ></Image>
            <p><strong>Nivel:</strong> {jugador.nivel}</p>
            <p><strong>Poder:</strong> {jugador.poder}</p>
        </div>
    );
}

CartaJugador.getInitialProps = async () => {
    return obtenerJugador();
}

