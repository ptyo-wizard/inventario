import React, {useState} from 'react'
import { useRouter } from 'next/router';
import useSWR from 'swr';
import useFetch from '../../../../hooks/useFetch';
import { ProductData,  FormProps } from '../../../../types'
import FormProducts from '../../../../components/product_form';
import Layaut from '../../../../components/layaout';
import ModalConfirm from '../../../../components/modal/modal_confirm'
import Container from '@material-ui/core/Container';
import { fetcher } from '../../../../utils/fetcher';




export default function EditProducts (){
    const router = useRouter();    
    const productId = router.query.productId;
    const {stateFetch, fetchData,resetState} = useFetch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    const { data, error } = useSWR(`http://localhost:3000/api/products/${productId}`, fetcher);    
    if (error) return <h2>{error}</h2>
    if (!data) return <h2>No hay datos  {data}</h2>    
    

    const editProducts = async (body:ProductData) => {
        const { _id } = data;
        fetchData({ url: `http://localhost:3000/api/products/${_id}`, method: 'PUT', body });     
        setModalIsOpen(true)   ;
      };
    
      
      const dataForm:FormProps = {
        data:data,
        submit: editProducts//=>{console.log("ya se quiere enviar producto")}
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
            <FormProducts title='Editar producto' dataForm={dataForm}   labelButton='Editar'>     
                
            </FormProducts>
            <ModalConfirm 
                open={modalIsOpen} 
                setOpen={setModalIsOpen} 
                stateFetch={stateFetch} 
                accept={handleAcept}
                messages={{
                    loading:"procesando.....",
                    success:"Elemento editado correctamente",
                    failed:"Error, no se pudo edita elemento"

                }}
                ></ModalConfirm>
            </Container>
        </Layaut>
    )
}



