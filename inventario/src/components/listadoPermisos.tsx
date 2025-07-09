import { Box, Button, Grid2 } from "@mui/material";
import TablaPermisos from "../modulos/permisos/views/Listar";
import { useState } from "react";
import { Rol } from "../models/usuarios";
import { GridRowSelectionModel } from "@mui/x-data-grid";

export default function ListadoPersmisos({rol, setVerEditarPermisos}: {rol: Rol | undefined, setVerEditarPermisos: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [seleccionadoPermiso, setSeleccionarPermiso]= useState<GridRowSelectionModel>([]);

    return (
        <Box>
            <h1>Listado de Permisos asociados a {rol?.nombre}</h1>
            <TablaPermisos setSeleccionar={setSeleccionarPermiso} filtros={
                rol && rol.id_role !== 0 ? [['id_role', rol.id_role]] : undefined
            }/>
            <Grid2
                container
                spacing={2}
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                marginTop={2}
            >
                <Grid2 size={{xs: 6}}> 
                    <Button onClick={() => window.location.href="/permiso/0"}>Agregar permiso</Button>
                </Grid2>
                <Grid2 size={{xs: 6}}> 
                    <Button onClick={() => setVerEditarPermisos(false)}>Volver</Button>
                </Grid2>
            </Grid2>
        </Box>
    );
}