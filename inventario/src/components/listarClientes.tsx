import { Grid2, Button } from "@mui/material";
import TablaClientes from "../modulos/clientes/views/Listar";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

export default function ListadoClientes() {
    const [seleccionado, setSeleccionar]= useState<GridRowSelectionModel>([]);
    
    useEffect(() => {
        if (seleccionado && seleccionado.length > 1) {
            window.location.href= "/cliente/"+seleccionado[0]
        }
    }, [seleccionado]);

    return (
        <div>
            <h1>Listado Clientes</h1>
            <TablaClientes setSeleccionar={setSeleccionar}/>
            <Grid2
                container
                spacing={2}
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                marginTop={2}
            > 
                <Grid2 size={{xs: 6}}> 
                    <Button onClick={() => window.location.href="/cliente/0"}>Agregar cliente</Button>
                </Grid2>
                <Grid2 size={{xs: 6}}> 
                    <Button onClick={() => window.history.back()}>Volver</Button>
                </Grid2>
            </Grid2>
        </div>
    );
}