import { obtenerJugador } from '../../../lib/servicios/mir4';

export default (request, response) => {

    obtenerJugador(request.query.id)
        .fetch(res => res.json())
        .catch(err => err);
}