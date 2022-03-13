import CartaJugador from '../../components/CartaJugador';

export default function Jugador({ jugador, id }) {
    return <CartaJugador jugador={jugador} index={id} />
}
