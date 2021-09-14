import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'

import { FormProductsProps } from '../../types';
import useForm from '../../hooks/useForm';



const ProductForm = ({
    title,
    dataForm,
    //fetch,
    count,
    children,
    labelButton
}: FormProductsProps) => {
    const { stateForm, handleChange, handleSubmit, error } = useForm(dataForm);
    return (
        <div style={{ paddingTop: '70px' }}>
            <Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Typography
                            variant="h5"
                            color="initial"
                            align="center"
                            gutterBottom
                        >
                            {title}
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={12} item>
                                <TextField
                                    error={error['code'] ? true : false}
                                    helperText={`${error['code'] ? error['code'] : ''}`}
                                    id="code"
                                    label="Codigo"
                                    name="code"
                                    value={stateForm.code}
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth

                                />
                            </Grid>
                            <Grid xs={12} sm={12} item>
                                <TextField
                                    id="description"
                                    name="description"
                                    label="Descripcion"
                                    multiline
                                    rows={4}
                                    value={stateForm.description}
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid xs={12} sm={12} item>
                                <TextField
                                    id="input"
                                    name="input"
                                    label="Entradas"
                                    value={stateForm.input}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth

                                />
                            </Grid>
                            <Grid xs={12} sm={12} item>
                                <TextField
                                    id="output"
                                    name="output"
                                    label="Salidas"
                                    value={stateForm.output}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                            </Grid>
                            <Grid xs={12} sm={12} item>
                                <TextField
                                    id="price"
                                    name="price"
                                    label="Precio"
                                    value={stateForm.price}
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            </Grid>
                            {
                                count
                            }
                            <Grid xs={12} sm={12} item>
                                <Button type="submit" variant="contained" color="primary" fullWidth>{labelButton}</Button>
                            </Grid>
                            {children}

                            {
                                Object.entries(error).map(([key, value]) => <p key={key} className="form-product__error">{value}</p>)
                            }
                        </Grid>
                    </form>
                </CardContent>
            </Card>

        </div>
    )
}
export default ProductForm;