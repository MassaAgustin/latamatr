import { useRouter } from 'next/router';

import DetalleJugador from '../../components/DetalleJugador';

import { obtenerJugador } from '../../lib/servicios/mir4';
import { obtenerParticipacionesById } from '../../lib/servicios/participante';


export default function Jugador({ jugador, participaciones }) {
    return <DetalleJugador jugador={jugador} participaciones={participaciones}/>
}

export async function getServerSideProps({ params }) {

    const [jugador, participaciones] = await Promise.all([
        obtenerJugador(params.id),
        obtenerParticipacionesById(params.id)
    ])

    return {
        props: {
            jugador: jugador,
            participaciones: participaciones
        }
    }
}