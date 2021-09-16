
import React from 'react';
import Modal from '@material-ui/core/Modal'
import { FetchProps } from '../../types'
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBtn: {
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%",
        marginTop:"1rem"
        
    },

    confirmModal: {
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",

        width: "250px",
        height: "130px",
        background: "white",

        boxShadow: theme.shadows[5],
        borderRadius: "5px",
        padding:"1rem"
        
    },
    btnSuccess: {
        background: "#39993d",
        color: "#f5f5f5",
        "&:hover": {
            background: "#5fda5fb3",
        }
    },
    btnError: {
        background: "#d63434",
        color: "#f5f5f5",
        "&:hover": {
            background: "#db4c4c",
        }
    },
    textError: {
        fontSize: "1rem",
        color: "#d63434",
    },
    textSuccess: {
        fontSize: "1rem",
        color: "#39993d",
    },

   
})
);

type ModalConfirmProps = {
    open: boolean,
    setOpen: (isOpen: boolean) => void,
    accept: (confirm:boolean) => void,    
    messages?: string
}



const ModalConfirm = ({ open, setOpen, accept,  messages }: ModalConfirmProps) => {
    const classes = useStyles();

    const bodyConfirmModal = (
        <div className={classes.confirmModal}>            
                <Typography className={classes.textError} align="center">
                    {messages}
                </Typography>
                <div className={classes.modalBtn}>
                    <Button
                        variant="contained"
                        onClick={()=>accept(true)}
                        type="button"
                        className={classes.btnSuccess}
                        size="small"
                    >
                        Aceptar
                    </Button>
                    
                    <Button
                        variant="contained"
                        type="button"
                        onClick={()=>setOpen(false)}
                        className={classes.btnError}
                        size="small"
                    >
                        Cancelar
                    </Button>             

                </div>            
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
