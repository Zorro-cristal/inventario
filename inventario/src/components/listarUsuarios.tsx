import { Box, Grid2, Button } from "@mui/material";
import TablaUsuarios from "../modulos/usuarios/views/Listar";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

export default function ListadoUsuarios() {
    const [seleccionado, setSeleccionar]= useState<GridRowSelectionModel>([]);

    useEffect(() => {
        if (seleccionado && seleccionado.length > 1) {
            window.location.href= "/usuario/"+seleccionado[0]
        }
    }, [seleccionado]);

    return (<Box sx={{ margin: 2 }}>
        <h1>Listado de Usuarios</h1>
        <TablaUsuarios setSeleccionar={setSeleccionar}/>
        <Grid2
            container
            spacing={2}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            marginTop={2}
        > 
            <Grid2 size={{xs: 3}}> 
                <Button onClick={() => window.location.href="/usuario/0"}>Agregar usuario</Button>
            </Grid2>
            <Grid2 size={{xs: 3}}> 
                <Button onClick={() => window.location.href="/rol"}>Listado de roles</Button>
            </Grid2>
            <Grid2 size={{xs: 3}}> 
                <Button onClick={() => window.history.back()}>Volver</Button>
            </Grid2>
        </Grid2>
    </Box>);
}