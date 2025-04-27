import { Grid2, Button } from "@mui/material";
import TablaProveedores from "../modulos/proveedor/views/Listar";

export default function ListadoProovedores({setProveedorVista}: {setProveedorVista: (value: boolean) => void}) {
    return (
        <div>
            <h1>Listado Proveedores</h1>
            <TablaProveedores />
            <Grid2
                container
                spacing={2}
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                marginTop={2}
            > 
                <Grid2 size={{xs: 6}}> 
                    <Button>Agregar proveedor</Button>
                </Grid2>
                <Grid2 size={{xs: 6}}> 
                    <Button onClick={() => setProveedorVista(false)}>Volver</Button>
                </Grid2>
            </Grid2> 
        </div>
    );
}