import React from 'react'
import Link from 'next/link'
import { Button, Container, createStyles, Grid, IconButton, makeStyles, Theme, Typography } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import InputIcon from '@material-ui/icons/Input';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Height } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        // root: {
        //     height: "200px",
        //     background:theme.palette.primary.main
        // },
        container: {
            display: "flex",
            flexDirection:"column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            [theme.breakpoints.down('xs')]:{
                height: "auto",                
            }
        },
        buttonGrid: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "200px",
            border:"1px solid grey",
            borderRadius: "8px",
            cursor: "pointer",
            background:theme.palette.primary.main,
            color:theme.palette.common.white
        },
        titlePanel:{
            marginBottom:"3rem"
        }
    }),
);


export default function Panel() {
    const classes = useStyles();
    return (
        <Container maxWidth="md" className={classes.container}>
            <Typography 
                variant="h4" 
                color="initial" 
                align="center"
                gutterBottom
                className={classes.titlePanel}
            >
                Operaciones con productos
            </Typography>
            <Grid container spacing={2} justifyContent="flex-start" alignItems="center">
                <Grid container item md={3} sm={3} xs={12} >
                    <Link href="/process/entry" passHref>
                        <div className={classes.buttonGrid}>
                            <Typography variant="h6" color="initial" align="center">Nueva entrada</Typography>
                            <IconButton aria-label="" onClick={() => { }} color="inherit">
                                <InputIcon />
                            </IconButton>
                        </div>
                    </Link>



                </Grid>
                <Grid item md={3} sm={3} xs={12}>
                    <Link href="/" passHref>
                        <div className={classes.buttonGrid}>
                            <Typography variant="h6" color="initial" align="center">Add a entrada</Typography>
                            <IconButton aria-label="" onClick={() => { }} color="inherit">
                                <AddBoxIcon />
                            </IconButton>
                        </div>
                    </Link>

                </Grid>

                <Grid item md={3} sm={3} xs={12}>
                    <Link href="/" passHref>
                        <div className={classes.buttonGrid} >

                            <Typography variant="h6" color="initial" align="center">Nueva salida</Typography>
                            <IconButton aria-label="" onClick={() => { }} color="inherit">
                                <CheckBoxOutlineBlankIcon />
                            </IconButton>
                        </div>
                    </Link>
                </Grid>

                <Grid item md={3} sm={3} xs={12}>
                    <Link href="/" passHref>
                        <div className={classes.buttonGrid}>

                            <Typography variant="h6" color="initial" align="center">Add a salida</Typography>
                            <IconButton aria-label="" onClick={() => { }} color="inherit">
                                <AddBoxIcon />
                            </IconButton>
                        </div>
                    </Link>

                </Grid>

                <Grid item md={3} sm={3} xs={12}>
                    <Link href="/" passHref>
                        <div className={classes.buttonGrid}>
                            <Typography variant="h6" color="initial" align="center">Total entrada</Typography>
                            <IconButton aria-label="" onClick={() => { }} color="inherit">
                                <PublishIcon />
                            </IconButton>
                        </div>
                    </Link>
                </Grid>
                <Grid item md={3} sm={3} xs={12}>
                    <Link href="/" passHref>
                        <div className={classes.buttonGrid}>
                            <Typography variant="h6" color="initial" align="center">Total salida</Typography>
                            <IconButton aria-label="" onClick={() => { }} color="inherit">
                                <GetAppIcon />
                            </IconButton>
                        </div>
                    </Link>

                </Grid>
            </Grid>

        </Container>
    )
}


