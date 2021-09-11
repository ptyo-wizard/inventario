import type { NextPage } from 'next'
import Layaut from '../components/layaout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Layaut>
      {
        <div className={styles.container}>
          <h1 className={styles.title}>
          hola mundo        
        </h1>

       </div>
      }
    </Layaut>
  )
}

export default Home
