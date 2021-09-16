import React, {useState} from 'react'
import { useRouter } from 'next/router';

import useFetch from '../../../../hooks/useFetch';
import { ProductData } from '../../../../types'

import Layaut from '../../../../components/layaout';
import ModalFetch from '../../../../components/modal/modal_fetch'
import ModalConfirm from '../../../../components/modal/modal_confirm'
import Container from '@material-ui/core/Container';





export default function DeleteProducts (){
    const router = useRouter();    
    const productId = router.query.productId;
    const {stateFetch, fetchData,resetState} = useFetch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [accept, setAccept] = useState(false);
    
    

    const deleteProducts = async (body:ProductData) => {        
        fetchData({ url: `http://localhost:3000/api/products/${productId}`, method: 'DELETE', body });     
        setModalIsOpen(true)   ;
      };
    
    const handleConfirm = (confirm:boolean)=>{
        setAccept(confirm);
    }
      
    const handleAcept = ()=> {
        if(stateFetch.isSucces){            
            setModalIsOpen(false);
            router.push('/');  
        }else{
            resetState();
            setModalIsOpen(false);
        }
        
   }

    return (
        <Layaut>
            <Container >
            <ModalConfirm
                open={confirmOpen} 
                setOpen={setConfirmOpen}                 
                accept={handleConfirm}
                
                messages="Seguto de querer elomomar este elemento"
                ></ModalConfirm>
           
            <ModalFetch 
                open={modalIsOpen} 
                setOpen={setModalIsOpen} 
                stateFetch={stateFetch} 
                accept={handleAcept}
                messages={{
                    loading:"procesando.....",
                    success:"Elemento eliminado correctamente",
                    failed:"Error, no se pudo eliminar elemento"

                }}
                />
                
            </Container>
        </Layaut>
    )
}



