import { Grid2, Button, Box } from "@mui/material";
import TablaProveedores from "../modulos/proveedor/views/Listar";
import { useEffect, useState } from "react";
import { GridRowSelectionModel } from "@mui/x-data-grid";

export default function ListadoProovedores() {
    const [seleccionado, setSeleccionar]= useState<GridRowSelectionModel>([]);
    
    useEffect(() => {
        if (seleccionado && seleccionado.length > 1) {
            window.location.href= "/producto/"+seleccionado[0]
        }
    }, [seleccionado]);
    
    return (
        <Box sx={{ margin: 2 }}>
            <h1>Listado Proveedores</h1>
            <TablaProveedores setSeleccionar={setSeleccionar}/>
            <Grid2
                container
                spacing={2}
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                marginTop={2}
            > 
                <Grid2 size={{xs: 6}}> 
                    <Button onClick={() => window.location.href="/proveedor/0"}>Agregar proveedor</Button>
                </Grid2>
                <Grid2 size={{xs: 6}}> 
                    <Button onClick={() => window.history.back()}>Volver</Button>
                </Grid2>
            </Grid2>
        </Box>
    );
}