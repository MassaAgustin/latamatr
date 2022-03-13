const { urlAPI } = require('./commons');
const seccion = 'mir4';
const urlFinal = `${urlAPI}${seccion}`;

const obtenerJugadores = async () => {
    return fetch(urlFinal, {
        method: 'GET',
        credentials: 'include'
    }).then(res => { return res.json() });
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