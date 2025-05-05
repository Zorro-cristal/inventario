import { Box, Grid2, Button } from "@mui/material";
import TablaUsuarios from "../modulos/usuarios/views/Listar";

export default function ListadoUsuarios({setUsuarioVista} : {setUsuarioVista: (value: boolean) => void}) {
    return (<Box>
        <h1>Listado de Usuarios</h1>
        <TablaUsuarios />
        <Grid2
                container
                spacing={2}
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                marginTop={2}
            > 
                <Grid2 size={{xs: 6}}> 
                    <Button>Agregar usuario</Button>
                </Grid2>
                <Grid2 size={{xs: 6}}> 
                    <Button onClick={() => setUsuarioVista(false)}>Volver</Button>
                </Grid2>
            </Grid2> 
    </Box>);
}