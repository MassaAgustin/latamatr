const { urlAPI } = require('./commons');
const seccion = 'clan/clases';
const urlFinal = `${urlAPI}${seccion}`;

const getClanesYClases = () => {
    return fetch(urlFinal, {
        method: 'GET'
    }).then(res => res.json())
}

module.exports = {
    getClanesYClases
}