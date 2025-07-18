import { Box, Button, Grid2 } from "@mui/material";
import TablaProductos from "../modulos/productos/views/Listar";
import { useEffect, useState } from "react";
import { GridRowSelectionModel } from "@mui/x-data-grid";

export default function ListadoProductos() {
    const [seleccionado, setSeleccionar]= useState<GridRowSelectionModel>([]);
    
    useEffect(() => {
        if (seleccionado && seleccionado.length > 1) {
            window.location.href= "/producto/"+seleccionado[0]
        }
    }, [seleccionado]);

    return (
        <Box sx={{ margin: 2 }}>
            <h1>Listado Productos</h1>
            <TablaProductos setSeleccionar={setSeleccionar}/>
            <Grid2
                container
                spacing={2}
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                marginTop={2}
            > 
                <Grid2 size={{xs: 6}}> 
                    <Button onClick={() => window.location.href="/producto/0"}>Agregar producto</Button>
                </Grid2>
                <Grid2 size={{xs: 6}}> 
                    <Button onClick={() => window.history.back()}>Volver</Button>
                </Grid2>
            </Grid2>
        </Box>
    );
}