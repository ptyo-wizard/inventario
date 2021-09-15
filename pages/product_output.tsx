import React, { useEffect, useState } from "react";
import useSWR from "swr";
import {fetcher} from '../utils/fetcher';
import Layaut from "../components/layaout";
import ProductTable from '../components/product_table';
import Container from '@material-ui/core/Container'
import Typography from "@material-ui/core/Typography";


export default function ProductEntry() {  
  const {data,error} = useSWR('http://localhost:3000/api/products/outputs',fetcher);
  if (error) return <h2>{error}</h2>
  if (!data) return <h2>No hay datos  {data}</h2>
    
  return (
    <Layaut>
      <Container maxWidth="lg">
        <Typography variant="h5" color="initial" align="center" gutterBottom>
          productos de salida
        </Typography> 
         <ProductTable data={data} isInput={false}></ProductTable>
      </Container>
         
      
  </Layaut>
  );
}

