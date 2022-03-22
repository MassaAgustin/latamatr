import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Paginador from '../components/Paginador';
import CartaJugador from '../components/CartaJugador';

import { getClanesYClases } from '../lib/servicios/clan';
import { obtenerJugadores } from '../lib/servicios/mir4';

export default function Home() {

  const [initialState, setInitialState] = useState(true);
  const [jugadores, setJugadores] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [nickName, setNickName] = useState('');
  const [nivel, setNivel] = useState('');
  const [poder, setPoder] = useState('');
  const [clan, setClan] = useState('');
  const [clase, setClase] = useState('');

  const [clanes, setClanes] = useState([{ _id: '999', nombre: 'Cargando...' }, { _id: '', nombre: 'Espera' }]);
  const [clases, setClases] = useState(['Cargando...', 'Espera']);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleNextPage = () => {
    setPage(page + 1);
  }

  const handlePrevPage = () => {
    setPage(page - 1);
  }

  const handleInfoJugadores = ({ jugadores, hasPrevPage, hasNextPage }) => {
    setJugadores(jugadores);
    setHasPrevPage(hasPrevPage);
    setHasNextPage(hasNextPage);
  }

  const handleRequestJugadores = async () => {
    return obtenerJugadores({ page, limit })
      .then(handleInfoJugadores);
  }

  const handleClickPaginador = (arrowLeft) => {
    arrowLeft ? handlePrevPage() : handleNextPage();
  }

  const toggleMenuFilter = () => {
    setMenuOpen(!menuOpen);
  }

  const filtroJugadores = () => {
    obtenerJugadores({ page, limit, nickName, nivel, poder, clan, clase })
      .then(handleInfoJugadores)
      .finally(() => { toggleMenuFilter() });
  }

  const limpiarFiltroMenu = () => {
    setNickName('');
    setNivel('');
    setPoder('');
    setClase('');
    setClan('');
  }

  const limpioFiltroJugadores = () => {
    limpiarFiltroMenu();
    handleRequestJugadores();
    toggleMenuFilter();
  }

  const handleFirstLoad = () => {
    Promise.all(
      [
        obtenerJugadores({ page, limit }),
        getClanesYClases()
      ]
    )
      .then(([{ jugadores, hasNextPage, hasPrevPage }, { clanes, clases }]) => {
        setJugadores(jugadores);
        setHasNextPage(hasNextPage);
        setHasPrevPage(hasPrevPage);
        setClanes(clanes)
        setClases(clases);
      })
      .catch(err => {
      })
      .finally(() => {
      });
  }

  const handleKeyPress = (e) => {
    if (e.key == 'Enter') {
      filtroJugadores();
    }
  }

  useEffect(() => {
    handleFirstLoad();
    setInitialState(false);
  }, []);

  useEffect(() => {
    if (!initialState) handleRequestJugadores();
  }, [page]);

  return (
    <div className={styles.container} onKeyDownCapture={handleKeyPress}>
      <Head>
        <title>Latam ATR</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.nav}>
        <input type="checkbox" value={menuOpen} checked={menuOpen} onChange={() => toggleMenuFilter()} />
        <span></span>
        <span></span>
        <div className={styles.menu}>
          <li>
            <input placeholder='Nickname' value={nickName} onChange={({ target }) => setNickName(target.value)} />
          </li>

          <li>
            <input placeholder='Clan' list="clanes" name="clan" id="clan" value={clan} onChange={({ target }) => setClan(target.value)} />
            <datalist id="clanes" placeholder='Clan'>
              {
                clanes.map(clan => {
                  return <option key={clan._id} value={clan._id} label={clan.nombre} />
                })
              }
            </datalist>
          </li>

          <li>
            <input placeholder='Clase' list="clases" name="clase" id="clase" value={clase} onChange={({ target }) => setClase(target.value)} />
            <datalist id="clases" placeholder='Clase'>
              {
                clases.map((clase, index) => {
                  return <option key={`clase-${index}`} value={clase} />
                })
              }
            </datalist>
          </li>

          <li>
            <input placeholder='Poder' type="number" value={poder} onChange={({ target }) => setPoder(target.value)} />
          </li>

          <li>
            <input placeholder='Nivel' type="number" value={nivel} onChange={({ target }) => setNivel(target.value)} />
          </li>

          <li className={styles.btnGroup}>
            <button onClick={() => filtroJugadores()}>Buscar</button>
            <button onClick={() => limpioFiltroJugadores()}>Limpiar</button>
          </li>
        </div>
      </div>

      <Paginador onClick={handleClickPaginador} hasPrevPage={hasPrevPage} hasNextPage={hasNextPage} />
      <main className={styles.main}>
        <div className={styles.grid}>
          {
            jugadores.map((jugador, index) => {
              return <CartaJugador jugador={jugador} index={index} key={`card-jugador-${index}`} />
            })
          }
        </div>
      </main >

      <footer className={styles.footer}>
        <a
          href="https://mir4global.com/"
          target="_blank"
          rel="noopener noreferrer"
          key="link-mi4"
        >
          <span className={styles.logo}>
            <Image src="/mir4icon.png" alt="Mir4 Logo" width={86} height={86} />
          </span>
        </a>
        <a
          href="https://discord.gg/zsUeYZWDrU"
          target="_blank"
          rel="noopener noreferrer"
          key="link-discord"
        >
          <span className={styles.logo}>
            <Image src="/discord.png" alt="Discord Logo" width={86} height={86} />
          </span>
        </a>
      </footer>
    </div >
  )
}
