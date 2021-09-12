import type { NextPage } from 'next'
import Layaut from '../components/layaout'
import styles from '../styles/Home.module.css'
import Button from '@material-ui/core/Button'


const Home: NextPage = () => {
  return (
    <Layaut>
      {
        <div className={styles.container}>
          <Button variant="contained" color="primary">
            button
          </Button>

       </div>
      }
    </Layaut>
  )
}

export default Home
