import React, { useState } from 'react'
import Link from 'next/link'
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ProductData, SendData } from '../../types';
import IconButton from '@material-ui/core/IconButton'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


type ProductTableProps = {
  data: ProductData[],
  setData?: (result: SendData[]) => void,
  isInput?: boolean,
  isOutput?: boolean,
  isDelete?: boolean
}

const useStyles = makeStyles((theme)=>({
  table: {
    minWidth: 650,
  },
  linkDetail: {
    textDecoration: "underline"
  },
  headCell:{
    background:"#344872",
    color:theme.palette.common.white
  }

}));

const ProductTable = ({ data, setData, isInput = true, isOutput = true, isDelete = false }: ProductTableProps) => {

  const classes = useStyles();
  const deleteElement = (id: string | number | undefined) => {
    console.log("id de elemento a del ", id, data)
    const result = data.filter(item => item.code !== id);
    //console.log("datos ", data)
    //if(result!)
    setData!(result);
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.headCell}>Codigo</TableCell>
            <TableCell align="right" className={classes.headCell}>Description</TableCell>
            {
              isInput && (
                <TableCell align="right" className={classes.headCell}>Entradas</TableCell>
              )
            }
            {
              isOutput && (
                <TableCell align="right" className={classes.headCell}>Salidas</TableCell>
              )
            }


            <TableCell align="right" className={classes.headCell}>Precio</TableCell>
            <TableCell align="right" className={classes.headCell}>Saldo</TableCell>
            {
              isDelete && (
                <TableCell align="right" className={classes.headCell}></TableCell>
              )
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row) => (
            <TableRow key={row.code}>
              <TableCell component="th" scope="row">
                {
                  row._id ?
                    <Link href={`/product/${row._id}`} >
                      <a className={classes.linkDetail}>{row.code}</a>
                    </Link>
                    : row.code

                }

              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              {
                isInput && (
                  <TableCell align="right">{row.input}</TableCell>
                )
              }
              {
                isOutput && (
                  <TableCell align="right">{row.output}</TableCell>
                )
              }


              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.input - row.output}</TableCell>
              {
                isDelete && (
                  <TableCell align="right">
                    <IconButton aria-label="" onClick={() => deleteElement(row.code)}>
                      <DeleteOutlineIcon></DeleteOutlineIcon>
                    </IconButton>
                  </TableCell>
                )
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  )
}

export default ProductTable
