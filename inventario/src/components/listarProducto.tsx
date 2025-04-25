import { Box, Button, Grid2 } from "@mui/material";
import TablaProductos from "../modulos/productos/views/Listar";

export default function ListadoProductos({setProductoVista}: {setProductoVista: (value: boolean) => void}) {
    return (
        <Box>
            <h1>Listado Productos</h1>
            <TablaProductos />
            <Grid2
                container
                spacing={2}
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                marginTop={2}
            > 
                <Grid2 size={{xs: 6}}> 
                    <Button>Agregar producto</Button>
                </Grid2>
                <Grid2 size={{xs: 6}}> 
                    <Button>Volver</Button>
                </Grid2>
            </Grid2> 
        </Box>
    );
}