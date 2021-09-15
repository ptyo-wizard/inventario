import type { NextPage } from 'next'
import Layaut from '../components/layaout'
import styles from '../styles/Home.module.css'
import Button from '@material-ui/core/Button'
import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'
import ProductTable from '../components/product_table'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'


const Home: NextPage = () => {
  const { data, error } = useSWR(`http://localhost:3000/api/products`, fetcher);    
  if (error) return <h2>{error}</h2>
  if (!data) return <h2>No hay datos  {data}</h2>

  return (
    <Layaut>
      <Container maxWidth="lg">      
      <Typography variant="h5" color="initial" align="center" gutterBottom>
        Todos los productos
      </Typography>        
          <ProductTable data={data}></ProductTable>
      </Container>
       
      
    </Layaut>
  )
}

export default Home
