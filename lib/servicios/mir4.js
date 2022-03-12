const { urlAPI } = require('./commons');
const seccion = 'mir4';
const urlFinal = `${urlAPI}${seccion}`;

const obtenerJugadores = async () => {
    return fetch(urlFinal, {
        method: 'GET'
    }).then(res => { return res.json() });
}

module.exports = {
    obtenerJugadores
}