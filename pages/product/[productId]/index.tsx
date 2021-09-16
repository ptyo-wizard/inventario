import React, { useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import Layaout from '../../../components/layaout'
import ProductTable from '../../../components/product_table';
import { fetcher } from '../../../utils/fetcher';
import { Container, Typography } from '@material-ui/core';
import { ProductData } from '../../../types';
import useFetch from '../../../hooks/useFetch';
import ModalConfirm from '../../../components/modal/modal_confirm';
import ModalFetch from '../../../components/modal/modal_fetch';


const useStyles = makeStyles((theme) => ({
    containerBtn: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin:"1rem"

    },
   
    btnDelete:{
        background:red[500]    ,
        color:theme.palette.common.white,
        "&:hover":{
            background:red[300]    ,
        }
    }
}))

const ProductDetail = () => {
    const [modalConfirm, setModalConfirm] = useState(false);
    const [modalConfirmNet, setModalConfirmNet] = useState(false);
    

    const classes = useStyles();
    const router = useRouter();
    const productId = router.query.productId;
    const { data, error } = useSWR(`http://localhost:3000/api/products/${productId}`, fetcher);
    const { stateFetch, fetchData, resetState } = useFetch();
    if (error) return <h2>{error}</h2>
    if (!data) return <h2>No hay datos en dtalle {data}</h2>

    
    const deleteProducts = async () => {        
        fetchData({ url: `http://localhost:3000/api/products/${productId}`, method: 'DELETE', body:{} });     
        //setModalConfirm(true);
      };
    
    
    
    const handleEdit = ()=>{
        router.push(`/product/${productId}/edit`);
    }

   const handleAcept = ()=>{
        setModalConfirm(false);
        setModalConfirmNet(true);
        deleteProducts();
   }

   const acceptDeleteElement = ()=>{
       router.push('/');
   }

    return (
        <Layaout>
            <Container style={{marginTop:"2rem"}}>
                <Typography variant="h4" color="initial" align="center" gutterBottom>Detalle de producto</Typography>
            {
                data && <ProductTable data={[data]} ></ProductTable>
            }
            <div className={classes.containerBtn}>
                <Button
                    variant="contained"
                    onClick={handleEdit}
                    type="button"
                    color="secondary"
                    
                >
                    Editar
                </Button>
                <Button
                    variant="contained"
                    onClick={()=>setModalConfirm(true)}
                    type="button"
                    
                    className={classes.btnDelete}
                >
                    Eliminar
                </Button>
            </div>

            <ModalConfirm
                open={modalConfirm} 
                setOpen={setModalConfirm}                 
                accept={handleAcept}
                messages="Esta seguro de eliminar este elemento"
                />

             <ModalFetch
                open={modalConfirmNet} 
                setOpen={setModalConfirmNet}      
                stateFetch={stateFetch}           
                accept={acceptDeleteElement}
                messages={
                    {
                        loading:"procesando....",
                        success:"Elemento eleminado correctamente",
                        failed:"No se pudo eliminar elemento"
                        
                    }
                }
                />
            </Container>
        </Layaout>


    )
}

export default ProductDetail;
