import React, { useEffect, useState } from "react";
import {fetcher} from '../utils/fetcher';
import useSWR from "swr";
import Layaut from "../components/layaout";
import ProductTable from '../components/product_table';
import { Container, Typography } from "@material-ui/core";


export default function ProductEntry() {
  const {data,error} = useSWR('http://localhost:3000/api/products/entrys',fetcher);
  if (!data ) return <p> Sin datos</p>
  return (
    <Layaut>
      <Container maxWidth="lg">
        <Typography variant="h5" color="initial" align="center" gutterBottom>
          Productos de entrada
        </Typography> 
        <ProductTable data={data} isOutput={false}></ProductTable>        
      </Container>
      
      
    </Layaut>
  );
}

