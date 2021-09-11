import type { NextPage } from 'next'
import Layaut from '../components/layaout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Layaut>
      {
        <h1 className={styles.title}>
         hola mundo
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ut distinctio illo voluptatem voluptates quae numquam sapiente? Quaerat non quis aliquam at ipsum corrupti accusantium ea, provident voluptas consequuntur sapiente.
         
       </h1>
      }
    </Layaut>
  )
}

export default Home
