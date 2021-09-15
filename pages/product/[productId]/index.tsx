import React from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import red from '@material-ui/core/colors/red';
import Layaout from '../../../components/layaout'
import ProductTable from '../../../components/product_table';
import { fetcher } from '../../../utils/fetcher';
import { Container, Typography } from '@material-ui/core';


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
    const classes = useStyles();
    const router = useRouter();
    const productId = router.query.productId;
    const { data, error } = useSWR(`http://localhost:3000/api/products/${productId}`, fetcher);
    if (error) return <h2>{error}</h2>
    if (!data) return <h2>No hay datos en dtalle {data}</h2>
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
                    onClick={() => { }}
                    type="button"
                    color="secondary"
                    
                >
                    Editar
                </Button>
                <Button
                    variant="contained"
                    onClick={() => { }}
                    type="button"
                    
                    className={classes.btnDelete}
                >
                    Eliminar
                </Button>
            </div>
            </Container>
        </Layaout>


    )
}

export default ProductDetail;
