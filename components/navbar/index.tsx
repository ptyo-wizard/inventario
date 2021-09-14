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
    menuItemLink:{
        color:theme.palette.common.white
    },
    //evita que el contenido quede debajo de navbar
    offset: theme.mixins.toolbar,
    menuButton: {
        marginRight: theme.spacing(2)
    }
})
);


export default function NavbBar() {
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const classes = useStyles();


    return (

        <div className="hero">
            <AppBar position="static">
                <Toolbar>

                    <Typography style={{ flexGrow: 1 }}>
                        <a >LOGO</a>
                    </Typography>
                    <div className={classes.sectionDesktop}>
                        <Button className={classes.menuButton}>
                            <Link href="/" >
                                <a className={classes.menuItemLink}>Inventario</a>
                            </Link>
                        </Button>
                        <Button className={classes.menuButton}>
                            <Link href="/product_entry" >
                                <a className={classes.menuItemLink}>Entradas</a>
                            </Link>
                        </Button>
                        <Button className={classes.menuButton}>
                            <Link href="/product_output">
                                <a className={classes.menuItemLink}>Salidas</a>
                            </Link>
                        </Button>
                        <Button className={classes.menuButton}>
                            <Link href="/create_product">
                                <a className={classes.menuItemLink}>Nuevo</a>
                            </Link>
                        </Button>
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
            <div className={classes.offset}></div>
            {
                <TempDrawer open={openDrawer} setOpen={setOpenDrawer}></TempDrawer>
            }
        </div>
    );
}

