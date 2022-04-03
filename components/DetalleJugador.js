import { useRouter } from 'next/router';
import Image from 'next/image';

import styles from '../styles/Home.module.css';

import ArrowLeft from './ArrowLeft';

export default function DetalleJugador({ jugador, participaciones }) {

    const { nickName, nivel, poder, clan, clase, subclase, fechaCreacion, fechaModificacion } = jugador;

    const dateCreacion = new Date(fechaCreacion);
    const dateModificacion = new Date(fechaModificacion);

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

    const goHomePage = () => {
        router.push('/');
    }

    return (
        <div className={styles.jugador}>
            <div className={styles['jugador__header']}>
                <h1>{nickName}</h1>
                <h2>{clase}</h2>
                <h3 className={styles['jugador__header__left']}>{poder}</h3>
                <h3 className={styles['jugador__header__right']}>{nivel}</h3>
            </div>

            <div className={styles['jugador__body']}>
                <p><strong>Clan: </strong>{clan}</p>
                <fieldset>
                    <legend>Participaciones Eventos</legend>
                    {
                        participaciones.map(participacion => {
                            const dateParticipacion = new Date(participacion.Participacion);
                            return <p key={`participacion-${participacion._id}`}><strong>{participacion.evento.nombre}: </strong>{dateParticipacion.toLocaleDateString()}, {dateParticipacion.toLocaleTimeString()}</p>
                        })
                    }
                </fieldset>
            </div>

            <ArrowLeft hasPrevPage={true} onClick={goHomePage} />
            <div className={styles['jugador__footer']}>
                <div className={styles['jugador__footer__right']}>
                    <Image src={obtenerImagen(jugador.clase)} objectFit='contain' width={200} height={300} alt='Imagen del jugador' />
                    <p>
                        <strong>Creacion: </strong>
                        {dateCreacion.toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Ultima Modificacion: </strong>
                        {dateModificacion.toLocaleDateString()}
                    </p>
                </div>
            </div>


        </div>
    )
}