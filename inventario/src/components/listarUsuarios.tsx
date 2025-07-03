import { Box, Grid2, Button } from "@mui/material";
import TablaUsuarios from "../modulos/usuarios/views/Listar";
import EditarUsuario from "../modulos/usuarios/views/Editar";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

export default function ListadoUsuarios() {
    const [verEditarVentana, setVerEditarVentana] = useState(false);
    const [seleccionado, setSeleccionar]= useState<GridRowSelectionModel>([]);

    useEffect(() => {
        if (seleccionado && seleccionado.length > 1) {
            window.location.href= "/producto/"+seleccionado[0]
        }
    }, [seleccionado]);

    if (verEditarVentana) {
        return (<EditarUsuario setVista={setVerEditarVentana}/>);
    } else {
        return (<Box>
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
                    <Grid2 size={{xs: 6}}> 
                        <Button onClick={() => window.location.href="/usuario/0"}>Agregar usuario</Button>
                    </Grid2>
                    <Grid2 size={{xs: 6}}> 
                        <Button onClick={() => window.history.back()}>Volver</Button>
                    </Grid2>
                </Grid2> 
        </Box>);
    }
}