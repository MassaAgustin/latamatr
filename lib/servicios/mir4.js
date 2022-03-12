const { urlAPI } = require('./commons');
const seccion = 'mir4';
const urlFinal = `${urlAPI}${seccion}`;

const obtenerJugadores = async () =>
    fetch(urlFinal, {
        method: 'GET',
        keepalive: true,
        referrerPolicy: 'origin',
        headers: {
            'Accept': '*/*'
        },
        mode: 'cors'
    })
        .then(res => { return res.json() })
        .catch(err => { return err });

module.exports = {
    obtenerJugadores
}