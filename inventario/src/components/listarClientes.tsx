import { Grid2, Button } from "@mui/material";
import TablaClientes from "../modulos/clientes/views/Listar";

export default function ListadoClientes({setClienteVista}: {setClienteVista: (value: boolean) => void}) {
    return (
        <div>
            <h1>Listado Clientes</h1>
            <TablaClientes />
            <Grid2
                container
                spacing={2}
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                marginTop={2}
            > 
                <Grid2 size={{xs: 6}}> 
                    <Button>Agregar cliente</Button>
                </Grid2>
                <Grid2 size={{xs: 6}}> 
                    <Button onClick={() => setClienteVista(false)}>Volver</Button>
                </Grid2>
            </Grid2> 
        </div>
    );
}