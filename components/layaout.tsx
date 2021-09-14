import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from './navbar'

type LayaoutProps = {
    children: React.ReactNode
}

export default function Layaut({ children }:LayaoutProps) {
  return (
    <div >
      <Head>
        <title>Inventario</title>
        <meta name="description" content="App inventario" />
        <link rel="icon" href="/favicon.ico" />       
      </Head>

      
        <Navbar></Navbar>
      

      <main className={styles.main}>
       {
           children
       }       
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          FRC{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
