import { Box, Button, Checkbox, FormControl, FormHelperText, Grid2, Input, InputLabel, styled } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from 'react';

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

    const [cargado, setCargado]= useState(false);
    const [camposComponent, setCamposComponent]= useState<React.JSX.Element[]>([]);
    const [inputFocus, setInputFocus]= useState("");
    
    // Inicializa el estado con valores vacíos para cada campo
    const initialFormState = campos.reduce((acc, campo) => {
        acc[campo.id] = valores[campo.id]; // Asigna un valor vacío a cada campo
        return acc;
    }, {});

    // Función para limpiar el formulario
    const limpiarFormulario = () => {
        setFormData(initialFormState); // Restablece el estado a los valores iniciales
    };    
    
    const [formData, setFormData] = useState(initialFormState);

    // Maneja el cambio en los campos
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setInputFocus(name);
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    useEffect(()=>{console.warn("Cambiado: ",formData);}, [formData])

    // Funcion para procesar datos
    const funcion_submit= (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        funcionSubmit(e);
        limpiarFormulario();
    }

    useEffect(() => {
        let componenteAgregar: React.JSX.Element[]= [];
        // Recorre los campos y genera su plantilla
        let id_campo: string;
        for (let i = 0; i < campos.length; i++) {
            id_campo= campos[i].id;
            if (campos[i].tipo == "boolean") {
                componenteAgregar.push(<Grid2 size= {{xs: 5}}><FormControl margin="dense" key={id_campo+'div'}>
                    <input type="hidden" name={id_campo} id={id_campo} onChange={handleChange}/>
                    <Checkbox name={id_campo} id={id_campo} onChange={handleChange} checked={formData[id_campo]}/>
                    <Button variant="outlined" onClick={campos[i].abrirDialog}>Seleccionar {id_campo}</Button>
                </FormControl></Grid2>);
            } else if (campos[i].tipo == "object") {
                componenteAgregar.push(<div style={{maxWidth: '95%'}}><FormControl margin="dense" key={id_campo+'div'}>
                    <InputLabel htmlFor={id_campo}>{id_campo.replace("_", " ")}</InputLabel>
                    <Input type={campos[i].tipo} name={id_campo} id={id_campo} onChange={handleChange} value={formData[id_campo]}/>
                    <FormHelperText>{campos[i].ayuda}</FormHelperText>
                </FormControl></div>);
            } else {
                const estilo= {maxWidth: campos[i].tipo=="text" ? '95%' : '45%'};
                let titulo= campos[i].id.replace("_", " ");
                titulo= titulo.charAt(0).toUpperCase() + titulo.slice(1); // Capitaliza la primera letra
                componenteAgregar.push(<div style={estilo}><FormControl margin="dense" key={id_campo+'div'}>
                    <InputLabel htmlFor={campos[i].id}>{titulo}</InputLabel>
                    <FilledInput type={campos[i].tipo} name={id_campo} id={id_campo} onChange={handleChange} value={formData[id_campo]} fullWidth= {campos[i].tipo=="text" ? true : false}/>
                    <FormHelperText>{campos[i].ayuda}</FormHelperText>
                </FormControl></div>);
            }
        };
        setCamposComponent(componenteAgregar); // Actualiza el estado con los campos generados
    }, [campos, formData]);
  
    useEffect(() => {
        document.getElementById(inputFocus)?.focus();
        if (!cargado && camposComponent.length > 0) {
            setCargado(true);
        }
    }, [camposComponent]);

    if (!cargado) {
        return (<div><h1>Cargando...</h1></div>);
    } else {
        return (<Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
            onSubmit={funcion_submit}
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
                <Grid2 size={{xs: 6}}> 
                    <Button type="submit">Guardar</Button>
                </Grid2>
                <Grid2 size={{xs: 6}}>
                    <Button type="button" onClick={limpiarFormulario}>Limpiar</Button>
                </Grid2>
            </Grid2> 
        </Box>);
    }
}