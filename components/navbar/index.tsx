import Link from 'next/link';
import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import { Typography, Toolbar, Button } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core'
import TempDrawer from '../drawer'

const useStyles = makeStyles((theme) => ({
    sectionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    iconMenu: {
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    
    //evita que el contenido quede debajo de navbar
    offset: theme.mixins.toolbar,
    menuButton: {
        marginRight: theme.spacing(2),
        color:theme.palette.common.white
    }
})
);


export default function NavbBar() {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const classes = useStyles();


    return (

        <div>
            <AppBar position="static">
                <Toolbar>

                    <Typography style={{ flexGrow: 1 }}>
                        <a >LOGO</a>
                    </Typography>
                    <div className={classes.sectionDesktop}>
                       
                            <Link href="/"  passHref>
                                <Button className={classes.menuButton} component="a">
                                    Inventario
                                </Button>
                            </Link>
                        
                             <Link href="/product_entry" passHref >
                             <Button className={classes.menuButton} component="a">
                                    Entradas
                                </Button>
                            </Link>
                        
                        
                            <Link href="/product_output" passHref>
                            <Button className={classes.menuButton} component="a">
                                Salidas
                                </Button>
                            </Link>
                                        

                            <Link href="/create_product" passHref>
                            <Button className={classes.menuButton} component="a">
                                Nuevo
                                </Button>
                            </Link>
                        
                    </div>
                    <IconButton
                        edge="end"
                        arial-label="menu"
                        color="secondary"
                        onClick={() => setOpenDrawer(true)}
                        className={classes.iconMenu}
                    >
                        <MenuIcon></MenuIcon>
                    </IconButton>
                </Toolbar>

            </AppBar>
            {/* <div className={classes.offset}></div>  */}
            
                <TempDrawer open={openDrawer} setOpen={setOpenDrawer}></TempDrawer>
            
        </div>
    );
}

