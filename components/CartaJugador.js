import styles from '../styles/Home.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function CartaJugador(props) {

    const { jugador, ...rest } = props;

    const router = useRouter();

    const obtenerImagen = (clase) => {

        if (jugador.selfie) return jugador.selfie;

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

    const imageLoader = ({ src, width, quality }) => {
        return jugador.selfie || obtenerImagen(jugador.clase);
    }

    const handleClickJugador = (e) => {
        e.preventDefault();
        router.push("/jugador/[id]", `/jugador/${jugador._id}`);
    }

    return (
        <div className={styles.card} onDoubleClick={handleClickJugador}>
            <h2><mark>{jugador.nickName}</mark></h2>
            {
                jugador.selfie
                &&
                <Image
                    loader={imageLoader}
                    src={`${jugador.nickName}.png`}
                    width={442}
                    height={705}
                    alt='Imagen del jugador'
                />
            }
            {
                !jugador.selfie
                &&
                <Image
                    src={obtenerImagen(jugador.clase)}
                    width={442}
                    height={705}
                    alt='Imagen del jugador'
                />
            }
            <p><strong>Nivel:</strong> {jugador.nivel}</p>
            <p><strong>Poder:</strong> {jugador.poder}</p>
        </div>
    );
}

