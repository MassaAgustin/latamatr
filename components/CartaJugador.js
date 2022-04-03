import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function CartaJugador(props) {

    const { jugador, ...rest } = props;

    const router = useRouter();

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

    const handleClickJugador = (e) => {
        e.preventDefault();
        router.push("/jugador/[id]", `/jugador/${jugador._id}`);
    }

    return (
        <div className={styles.card} onDoubleClick={handleClickJugador}>
            <h2><mark>{jugador.nickName}</mark></h2>
            <Image src={obtenerImagen(jugador.clase)} width={442} height={705} alt='Imagen del jugador' />
            <p><strong>Nivel:</strong> {jugador.nivel}</p>
            <p><strong>Poder:</strong> {jugador.poder}</p>
        </div>
    );
}

