import React, { useState } from 'react'
import useFetch from '../hooks/useFetch';
import Layaut from '../components/layaout';
import { ProductData } from '../types';
import DateFnsUtils from "@date-io/date-fns";
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { Container, Grid, Typography, Button, TableContainer, Table, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    cellPicker: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        //background:"blue"
    },
    gridPicker: {
        background: "rgba(0,0,0,0.5)",
        borderRadius: "8px",
        marginTop: "2rem",
        padding:"2rem"
    },
    titlePicker:{        
        marginBottom:"1rem"
    },
    labelPicker:{
        color:theme.palette.common.white
    }
}))

export default function Total() {
    const classes = useStyles();
    const [startDate, setStarDate] = React.useState<Date | null>(new Date);
    const [endDate, setEndDate] = React.useState<Date | null>(new Date);
    //const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    //const [startDate, endDate] = dateRange;
    const { stateFetch, fetchData, resetState } = useFetch();
    let allInputs = 0;
    let allOutputs = 0;

    const handleTotal = () => {
        fetchData({
            url: `http://localhost:3000/api/products/total`, method: 'POST',
            body: {
                startDate,
                endDate
            }
        });
    }
    const calcNProducts = (data: ProductData[], type: boolean): number => {        

        if (type) { //iputs
            return (
                data.filter((item: ProductData) => item.input > 0)
                    .reduce((current, item) => current + item.input, 0)
            )
        }
        return ( //outputs
            data.filter((item) => item.output > 0)
                .reduce((current, item) => current + item.output, 0)
        )
    }

    const moreSeller = (data: ProductData[]) => {
        const result = data.reduce((current, item) => current > item.output ? current : current = item.output, 0)
        return data.filter((item) => item.output === result);
    }



    return (
        <Layaut>
            <Container maxWidth="md">


                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container  className={classes.gridPicker}>
                        <Grid item md={12} sm={12} xs={12} className={classes.cellPicker}>
                            <Typography 
                                variant="h5"                                 
                                align="center"
                                gutterBottom
                                className={classes.titlePicker}
                                color="primary"
                            >
                                Calcular segun rango de tiempo
                            </Typography>
                        </Grid>
                        <Grid container item alignItems="center" justifyContent="center" spacing={4}>

                            <Grid item md={3} sm={3} xs={12} className={classes.cellPicker}>
                            
                                <DatePicker
                                    label="Fecha Inicial"
                                    value={startDate}
                                    onChange={setStarDate}
                                    format="yyyy MMM  d"
                                />
                            </Grid>
                            <Grid item md={3} sm={3} xs={12} className={classes.cellPicker}>
                                
                                <DatePicker
                                    label="Fecha Final"
                                    format="yyyy MMM  d"
                                    value={endDate}
                                    onChange={setEndDate} />
                            </Grid>
                            <Grid item md={3} sm={3} xs={12}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleTotal}
                                    size="small"
                                    fullWidth
                                >
                                    Clacular
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </MuiPickersUtilsProvider>


                <div>

                    {
                        stateFetch.isSucces && stateFetch.data && (
                            <div style={{ marginTop: "2rem" }}>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Total entradas</TableCell>
                                                <TableCell>Total salidas</TableCell>
                                                <TableCell>Saldo</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableCell>{
                                                stateFetch.isSucces && stateFetch.data && (
                                                    allInputs = calcNProducts(stateFetch.data, true)
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    stateFetch.isSucces && stateFetch.data && (
                                                        allOutputs = calcNProducts(stateFetch.data, false)
                                                    )}
                                            </TableCell>
                                            <TableCell>
                                                {allInputs - allOutputs}
                                            </TableCell>
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <div style={{ marginTop: "2rem" }}>
                                    <h4 className="total__item">Mas Vendidos:</h4>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Codigo</TableCell>
                                                    <TableCell>Descripcion</TableCell>
                                                    <TableCell>Salidas</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    moreSeller(stateFetch.data).map((item) => {
                                                        return (
                                                            <TableRow key={item.code}>
                                                                <TableCell>{item.code}</TableCell>
                                                                <TableCell>{item.description} </TableCell>
                                                                <TableCell>{item.output} </TableCell>
                                                            </TableRow>
                                                        );
                                                    }
                                                    )
                                                }

                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </div>
                            </div>
                        )
                    }
                </div>

            </Container>
        </Layaut>
    )
}
