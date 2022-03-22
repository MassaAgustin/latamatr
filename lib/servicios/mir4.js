const { urlAPI } = require('./commons');
const seccion = 'mir4';
const urlFinal = `${urlAPI}${seccion}`;

const obtenerJugadores = async ({ page = null, limit = null, sort = null, order = null, nickName = null, poder = null, nivel = null, clan = null, clase = null }) => {

    try {
        let paramPaginacion = '';

        if (page && limit) {
            paramPaginacion = `page=${page}&limit=${limit}`;
        }

        if (sort && order) {
            paramPaginacion = `${paramPaginacion}&sortk=${sort}&order=${order}`;
        }

        if (nickName) paramPaginacion += `&nickName=${nickName}`;
        if (poder) paramPaginacion += `&poder=${poder}`;
        if (nivel) paramPaginacion += `&nivel=${nivel}`;
        if (clan) paramPaginacion += `&clan=${clan}`;
        if (clase) paramPaginacion += `&clase=${clase}`;

        return fetch(`${urlFinal}?${paramPaginacion}`, {
            method: 'GET',
        }).then(res => res.json());
    }
    catch (err) {
        console.log(err);
    }
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