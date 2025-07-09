import { Box, Button, Grid2, Modal } from "@mui/material";
import TablaRoles from "../modulos/roles/views/Listar";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Rol } from "../models/usuarios";
import { recuperarRoles } from "../modulos/roles/controllers/recuperar";
import ListadoPersmisos from "./listadoPermisos";

export default function ListadoRoles() {
    const [seleccionadoRol, setSeleccionarRol]= useState<GridRowSelectionModel>([]);
    const [verEditarPermisos, setVerEditarPermisos] = useState(false);

    const [rol, setRol] = useState<Rol>();
    
    useEffect(() => {
        // Obtener los datos del rol
        if (seleccionadoRol.length > 0) {
            recuperarRoles([['id_role', seleccionadoRol[0]]]).then((data) => {
                setRol(data[0]);
            });
        }
    }, [seleccionadoRol]);

    return (<Box>
        <h1>Listado de Roles</h1>
        <TablaRoles setSeleccionar={setSeleccionarRol} />
        <Grid2
            container
            spacing={2}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            marginTop={2}
        >
            <Grid2 size={{xs: 3}}> 
                <Button onClick={() => {window.location.href="/rol/" + (rol && seleccionadoRol.length > 0 ? rol.id_role : "0")}}>{rol && seleccionadoRol.length > 0 ? "Editar" : "Agregar"} rol</Button>
            </Grid2>
            <Grid2 size={{xs: 3}}> 
                <Button onClick={() => setVerEditarPermisos(true)} disabled={rol && seleccionadoRol.length > 0 ? false : true}>Ver Permisos asociados</Button>
            </Grid2>
            <Grid2 size={{xs: 3}}> 
                <Button onClick={() => window.history.back()}>Volver</Button>
            </Grid2>
        </Grid2>
        <Modal
            open={verEditarPermisos}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflowY: 'auto',
            }}
        >
            <ListadoPersmisos rol={rol} setVerEditarPermisos={setVerEditarPermisos}/>
        </Modal>
    </Box>);
}