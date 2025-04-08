import { Box, Button, Checkbox, FormControl, FormHelperText, Grid2, Input, InputLabel, styled } from "@mui/material";
import React, { ChangeEvent, useState } from 'react';

export interface camposForm {
    id: string;
    requerido: boolean;
    ayuda: string;
    tipo: string
    abrirDialog: (() => boolean) | null;
}

export const Formulario= ({
    campos,
    funcionSubmit,
    valores,
  }: {
    campos: Array<camposForm>;
    funcionSubmit: (event: ChangeEvent<HTMLInputElement>) => boolean;
    valores: unknown;
  }) => {
    let camposComponent: Array<typeof React.JSX.Element>= [];
    
    // Inicializa el estado con valores vacíos para cada campo
    const initialFormState = campos.reduce((acc, campo) => {
        acc[campo.id] = ''; // Asigna un valor vacío a cada campo
        return acc;
    }, {});
    
    const [formData, setFormData] = useState(initialFormState);

    // Maneja el cambio en los campos
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        //const { name, value } = e.target;
        console.log(e);
        setFormData({
            ...formData,
        //    [name]: value,
        });
    };

    // Estilo personalizado para el Input
    const FilledInput = styled(Input)(({ theme }) => ({
        backgroundColor: theme.palette.action.hover, // Fondo similar al de TextField filled
        borderRadius: theme.shape.borderRadius, // Bordes redondeados
        padding: "8px 12px", 
        '&:hover': {
        backgroundColor: theme.palette.action.selected,
        },
        '&.Mui-focused': {
        backgroundColor: theme.palette.action.hover,
        border: `2px solid ${theme.palette.primary.main}`, // Borde al enfocarse
        },
    }));

    // Función para limpiar el formulario
    const limpiarFormulario = () => {
        setFormData(initialFormState); // Restablece el estado a los valores iniciales
    };

    // Funcion para procesar datos
    const funcion_submit= (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        funcionSubmit(e);
        limpiarFormulario();
    }

    // Recorre los campos y genera su plantilla
    let id_campo: string;
    for (let i = 0; i < campos.length; i++) {
        id_campo= campos[i].id;
        if (campos[i].tipo == "boolean") {
            camposComponent.push(<Grid2 xs={5}><FormControl margin="dense">
                <input type="hidden" name={id_campo} id={id_campo} onChange={handleChange}/>
                <Checkbox name={id_campo} id={id_campo} onChange={handleChange} checked={valores[id_campo]}/>
                <Button variant="outlined" onClick={campos[i].abrirDialog}>Seleccionar {id_campo}</Button>
            </FormControl></Grid2>);
        } else if (campos[i].tipo == "object") {
            camposComponent.push(<div style={{maxWidth: '45%'}}><FormControl margin="dense">
                <InputLabel htmlFor={id_campo}>{id_campo.replace("_", " ")}</InputLabel>
                <Input type={campos[i].tipo} name={id_campo} id={id_campo} onChange={handleChange} value={valores[id_campo]}/>
                <FormHelperText>{campos[i].ayuda}</FormHelperText>
            </FormControl></div>);
        } else {
            console.log(campos[i]);
            const estilo= {maxWidth: campos[i].tipo=="text" ? '95%' : '45%'};
            let titulo= campos[i].id.replace("_", " ");
            titulo= titulo.charAt(0).toUpperCase() + titulo.slice(1); // Capitaliza la primera letra
            camposComponent.push(<div style={estilo}><FormControl margin="dense">
                <InputLabel htmlFor={campos[i].id}>{titulo}</InputLabel>
                <FilledInput type={campos[i].tipo} name={id_campo} id={id_campo} onChange={handleChange} value={valores[id_campo]} fullWidth= {campos[i].tipo=="text" ? true : false}/>
                <FormHelperText>{campos[i].ayuda}</FormHelperText>
            </FormControl></div>);
        }
    };
    return (<Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        {camposComponent}
        <Grid2
            container
            spacing={2}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            marginTop={2}
        > 
            <Grid2 item xs={6}> 
                <Button type="submit">Guardar</Button>
            </Grid2>
            <Grid2 item xs={6}> 
                <Button type="button" onClick={limpiarFormulario}>Limpiar</Button>
            </Grid2>
        </Grid2> 
    </Box>);
}