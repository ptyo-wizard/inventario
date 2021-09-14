
import React from 'react';
import Modal from '@material-ui/core/Modal'
import { FetchProps} from '../../types'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme)=>({
    modal:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    modalBtn:{
        display: "grid",    
        gap: "10px",
        gridAautoFlow: "dense",
        gridAautoEows: "40px",
        gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,120px),1fr))",
        placeItems:"center",
        marginTop: "10px"
    },
    
    confirmModal:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        
        width:"250px",
        height:"130px",
        background:"white",
       
        boxShadow:theme.shadows[5],
        borderRadius:"5px"
    },
    btnSuccess:{
        background: "#39993d",
        color:"#f5f5f5",
        "&:hover":{
            background: "#5fda5fb3",
        }
    },
    btnError:{
        background: "#d63434",
        color:"#f5f5f5",
        "&:hover":{
            background: "#db4c4c",
        }
    },
    textError:{
        fontSize:"1rem",
        color: "#d63434",
    },
    textSuccess:{
        fontSize:"1rem",
        color: "#39993d",        
    },
  
    textLoading:{
        fontSize:"1rem",
        color:"#2b2bb1"
    }

})
);

type ModalConfirmProps = {    
    open: boolean,
    setOpen:(isOpen:boolean)=>void,
    stateFetch:FetchProps,
    accept:()=>void
}



const ModalConfirm = ({open,setOpen,stateFetch,accept}:ModalConfirmProps) => {
    const classes = useStyles();

    const bodyConfirmModal = (
        <div className={classes.confirmModal}>
                   
        {
                stateFetch.isLoading && <h3 className={classes.textLoading}>procesando ...</h3>
        }
        {
                stateFetch.isSucces && !stateFetch.isFailed  &&(
                    <div>
                        <h3 className={classes.textSuccess}>Elemento creado correctamente</h3>
                        <div className={classes.modalBtn}>
                            <Button 
                                variant="contained" 
                                onClick={accept} 
                                type="button"  
                                className={classes.btnSuccess}
                            >
                              Aceptar
                            </Button>
                            
                        </div>                       

                    </div>

                )
            }
            {
                stateFetch.isFailed && (
                    <div>
                        <h3 className={classes.textError}>No se pudo crear elemento</h3>
                        <div className={classes.modalBtn}>
                            <Button 
                                variant="contained"                               
                                type="button"
                                onClick={accept} 
                                className={classes.btnError}
                            >
                                Aceptar
                            </Button>                            
                        </div>
                    </div>
                )
            }
        </div>
    )
    return (
        <Modal
        open={open}
        onClose={setOpen}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"                
        className={classes.modal}
    >
        {bodyConfirmModal}               
    </Modal> 
    )
}

export default ModalConfirm
