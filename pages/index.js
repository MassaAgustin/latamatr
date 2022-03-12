import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';

import { obtenerJugadores } from '../lib/servicios/mir4';

export default function Home() {

  const [jugadores, setJugadores] = useState([]);
  const [loadingJugadores, setLoadingJugadores] = useState(true);
  const [labelInformativo, setLabelInformativo] = useState('Cargando jugadores...');

  const obtenerImagen = (clase) => {

    switch (clase) {
      case "Ballestera":
        return '/crossbow.webp';
      case "Taoista":
        return '/conjurer.png';
      case "Guerrero":
        return '/warrior.png';
      case "Lancero":
        return '/hunter.png';
      case "Mago":
      default:
        return '/mage.png';
    }

  }

  useEffect(() => {

    obtenerJugadores()
      .then(res => {
        setJugadores(res);
      });

  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Unanse a nuestro<a href="https://discord.gg/zsUeYZWDrU"> Discord</a>
        </h1>

        <div className={styles.grid}>
          {
            jugadores.map((jugador, index) => {
              return (
                <div className={styles.card} key={`card-jugador-${index}`}>
                  <h2><mark>{jugador.nickName}</mark></h2>
                  <Image className={styles.img} src={obtenerImagen(jugador.clase)} width={442} height={705} about='Imagen del jugador' />
                  <p><strong>Nivel:</strong> {jugador.nivel}</p>
                  <p><strong>Poder:</strong> {jugador.poder}</p>
                </div>
              )
            })
          }
        </div>
      </main >

      <footer className={styles.footer}>
        <a
          href="https://mir4global.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            <Image src="/mir4icon.png" alt="Mir4 Logo" width={86} height={86} />
          </span>
        </a>
      </footer>
    </div >
  )
}
