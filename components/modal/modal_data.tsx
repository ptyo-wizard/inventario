
import React from 'react';
import Modal from '@material-ui/core/Modal'
import { SendData } from '../../types'
import ProductTable from '../product_table';
import IconButton from '@material-ui/core/IconButton'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


type ModalDataProps = {
    buffer:SendData[],
    setBuffer:(data:SendData[])=>void
    open: boolean,
    setOpen:(isOpen:boolean)=>void
}

const useStyles = makeStyles((theme)=>({
   
    dataModal:{        
        background:"gray"
    },
})
);

const ModalData = ({buffer,setBuffer,open, setOpen}: ModalDataProps) => {
    
    const classes = useStyles();

    const bodyDataModal = (
        <div className={classes.dataModal}>
                <Container >
                  <IconButton 
                    color="secondary" 
                    aria-label="boton cerrar" 
                    onClick={()=>setOpen(false)}                    
                    >
                        <CloseOutlinedIcon fontSize="large" />
                    </IconButton>                   
                    <ProductTable data={buffer} setData={setBuffer} isDelete={true} ></ProductTable>
                </Container>              
                </div>
    )

    return (
        <Modal
                open={open}
                onClose={()=>setOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"                
            >
                {bodyDataModal}
        </Modal>
       
    )
}

export default ModalData;

