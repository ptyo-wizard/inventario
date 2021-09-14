import Link from 'next/link';
import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import { Typography, Toolbar, Button} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core'
import { Menu, MenuItem} from "@material-ui/core";
import TempDrawer from '../drawer'

const useStyles = makeStyles((theme) => ({    
    sectionDesktop:{
        display:"none",        
        [theme.breakpoints.up("md")]:{
            display:"flex"
        }
    },
		iconMenu:{
			[theme.breakpoints.up("md")]:{
				display:"none"
			}
		}, 
		mobileMenu:{
			color: "#000"
		},
        //evita que el contenido quede debajo de navbar
        offset:theme.mixins.toolbar,
        menuButton:{
            marginRight:theme.spacing(2)
        }       
    })
);


export default function NavbBar() {
    const [openDrawer,setOpenDrawer] = useState<boolean>(false);
    const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<Element | null>(null);
	const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);
    const classes = useStyles();

	const openMobileMenu =(event:React.MouseEvent)=>{
		setMobileMenuAnchorEl(event.currentTarget);
	}
	const closeMobileMenu =(event:React.MouseEvent)=>{
		setMobileMenuAnchorEl(null);
	}

	const mobileMenu = (
		<Menu 
			anchorEl={mobileMenuAnchorEl}
			id="menu-mobile"
			keepMounted
			open={isMobileMenuOpen}
			
			
			>
			<MenuItem onClick={closeMobileMenu} className={classes.mobileMenu}>
				<Link href="/" >
        	<a className={classes.mobileMenu}>Inventario</a>
        </Link>
			</MenuItem>
			<MenuItem 
                onClick={closeMobileMenu}
                
            >
				<Link href="/product_entry" >
					<a className={classes.mobileMenu}>Entradas</a>
				</Link>
			</MenuItem>
			<MenuItem onClick={closeMobileMenu}>
				<Link href="/product_output">
        	<a className={classes.mobileMenu}>Salidas</a>
        </Link>
			</MenuItem>
		</Menu>
	)


    return (
        
        <div className="hero">
            <AppBar position="static">
                <Toolbar>
                    
                    <Typography style = {{flexGrow:1}}>
                        <a >LOGO</a>
                    </Typography>
                   <div className={classes.sectionDesktop}>
                    <Button className={classes.menuButton}>
                    <Link href="/" >
                            <a  className="menu__item__link">Inventario</a>
                        </Link>
                    </Button>
                    <Button className={classes.menuButton}>
											<Link href="/product_entry" >
															<a  className="menu__item__link">Entradas</a>
													</Link>
                    </Button>
                    <Button className={classes.menuButton}>
                    	<Link href="/product_output">
                            <a  className="menu__item__link">Salidas</a>
                        </Link>
                    </Button>
					<Button className={classes.menuButton}>
                    	<Link href="/create_product">
                            <a  className="menu__item__link">Nuevo</a>
                        </Link>
                    </Button>
                    </div>
                    <IconButton 
                        edge="end" 
                        arial-label="menu" 
                        color="secondary"                         
                        onClick = {()=>setOpenDrawer(true)}
						className={classes.iconMenu}
                        >
                        <MenuIcon></MenuIcon>
                    </IconButton>
                </Toolbar>                
                
            </AppBar>
            <div className={classes.offset}></div>
						{
							// mobileMenu
                            <TempDrawer open={openDrawer} setOpen={setOpenDrawer}></TempDrawer>
						}
        </div>
    );
}

