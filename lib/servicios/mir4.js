const { urlAPI } = require('./commons');
const seccion = 'mir4';
const urlFinal = `${urlAPI}${seccion}`;

const obtenerJugadores = async ({ page = null, limit = null, sort = null, order = null }) => {

    let paramPaginacion = '';

    if (page && limit) {
        paramPaginacion = `page=${page}&limit=${limit}`;
    }

    if (sort && order) {
        paramPaginacion = `${paramPaginacion}&sortk=${sort}&order=${order}`;
    }

    return fetch(`${urlFinal}?${paramPaginacion}`, {
        method: 'GET',
    }).then(res => res.json());
}

const obtenerJugador = async (id) => {
    const url = `${urlFinal}/${id}`;
    return fetch(url, {
        method: 'GET'
    }).then(res => { return res.json() });
}

module.exports = {
    obtenerJugador,
    obtenerJugadores
}