const { urlAPI } = require('./commons');
const seccion = 'participante';
const urlFinal = `${urlAPI}${seccion}`;

const obtenerParticipacionesById = async (id) => {
    const url = `${urlFinal}/${id}`;
    return fetch(url, {
        method: 'GET'
    }).then(res => { return res.json() });
}

module.exports = {
    obtenerParticipacionesById
}