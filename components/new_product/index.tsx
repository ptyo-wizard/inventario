import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { FormProps, ProductData, SendData, InputOrOutput } from '../../types'
import useFetch from '../../hooks/useFetch'
import Layaut from '../layaout'
import FormProduct from '../product_form'
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ModalData from '../modal/modal_data'
import ModalFetch from '../modal/modal_fetch'




const useStyles = makeStyles((theme) => ({  
   
    btnSuccess: {
        background: "#39993d",
        color: "#f5f5f5",
        "&:hover":{
            background: "#5fda5fb3",
        }
    },
    
    countLabel: {
        fontSize: "1rem",
        color: "#39993d",
        textAlign: "center",
        textDecoration: "underline",
        width: "100%"
    },
    

})
);

const dataTemp: ProductData = {
    code: '',
    description: '',
    input: 0,
    output: 0,
    price: 0
}

export const NewProduct = (process: InputOrOutput ) => {
    const [buffer, setBuffer] = useState<SendData[]>([])
    const { stateFetch, fetchData, resetState } = useFetch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalConfirm, setModalConfirm] = useState(false);
    const router = useRouter();
    const classes = useStyles();

    const addProduct = (data: SendData) => {
        setBuffer([
            ...buffer,
            data
        ])
    }

    const dataForm: FormProps = {
        data: dataTemp,
        submit: addProduct
    }

    const handleBuffer = () => {
        setModalIsOpen(true);
    }

    const sendAll = () => {
        //console.log("send all ", buffer)
        fetchData({ url: `http://localhost:3000/api/products`, method: 'POST', body: buffer });
        setModalConfirm(true);
    }

    const handleAccept = () => {
        if (stateFetch.isSucces) {
            setModalConfirm(false);
            router.push('/');
        } else {
            resetState();
            setModalConfirm(false);
        }

    }

    return (
        <Layaut>
            <FormProduct
                title='Crear producto nuevo'
                dataForm={dataForm}
                process={process}
                count={
                    buffer.length > 0 && (
                        <a href="#" onClick={handleBuffer} className={classes.countLabel} >
                            Hay {buffer.length} productos
                        </a>
                    )
                }
                labelButton='Crear Producto'
            >
                {
                    buffer.length > 0 && (
                        <>
                            <Grid xs={12} sm={12} item>
                                <Button
                                    variant="contained"                                    
                                    onClick={sendAll}
                                    type="button"
                                    fullWidth
                                    className={classes.btnSuccess}

                                >
                                    Enviar Todo
                                </Button>
                            </Grid>
                        </>
                    )
                }
            </FormProduct>

            <ModalData buffer={buffer} setBuffer={setBuffer} open={modalIsOpen} setOpen={setModalIsOpen} />
            <ModalFetch 
                open={modalConfirm} 
                setOpen={setModalConfirm} 
                stateFetch={stateFetch} 
                accept={handleAccept} 
                messages={{
                    loading:"procesando...",
                    success:"Elemento creado correctamente",
                    failed:"Falla al crear Elemento"
                }}
            />

        </Layaut>

    )
}

