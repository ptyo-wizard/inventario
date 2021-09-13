import React, { useEffect, useState } from "react";
import useSWR from "swr";
import {fetcher} from '../utils/fetcher';
import Layaut from "../components/layaout";
import ProductTable from '../components/product_table';
import Container from '@material-ui/core/Container'


export default function ProductEntry() {  
  const {data,error} = useSWR('http://localhost:3000/api/products/outputs',fetcher);
  if (error) return <h2>{error}</h2>
  if (!data) return <h2>No hay datos  {data}</h2>
    
  return (
    <Layaut>
      <Container maxWidth="lg">
        <h2 className="title">Salidas de productos</h2>
         <ProductTable data={data} isInput={false}></ProductTable>
      </Container>
         
      
  </Layaut>
  );
}

