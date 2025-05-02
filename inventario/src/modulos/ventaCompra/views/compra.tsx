import DeleteIcon from '@mui/icons-material/Delete';
import { Paper, Grid2, TextField, Select, MenuItem, IconButton, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TablaProductos from "../../productos/views/Listar";
import { useState } from "react";
import { obtenerProveedor } from '../../proveedor/funciones/abm';

export default function Compra({setCompraVista}: {setCompraVista: (value: boolean) => void}) {
    const fechaActual = new Date();
    const columnas = [
        { field: 'id_producto', headerName: 'ID', flex: 0.1 },
        { field: 'nombre_producto', headerName: 'Nombre', flex: 0.2 },
        { field: 'cantidad', headerName: 'Cantidad Disponible', flex: 0.1, editable: true },
        { field: 'precio', headerName: 'Precio unitario', flex: 0.2 },
        { field: 'iva_5', headerName: 'Iva 5%', flex: 0.1 },
        { field: 'iva_10', headerName: 'Iva 10%', flex: 0.1 },
        { field: 'exenta', headerName: 'Exenta', flex: 0.1 },
        { field: 'subTotal', headerName: 'Precio de Compra', flex: 0.2 },
        { field: 'acciones', headerName: 'Acciones', flex: 0.1, renderCell: (params) => {
            if (params.id !== '') {
                return (
                    <IconButton onClick={() => {
                        let cargados= [... productosCargados];
                        cargados.splice(cargados.indexOf(params.row), 1);
                        setProductosCargados(cargados);
                    }}><DeleteIcon/></IconButton>
                );
            } else {
                return null;
            }
        }}
    ];

    const [nombreProveedor, setNombreProveedor]= useState("");
    const [tituloBoton, setTituloBoton]= useState("Agregar provee");
    const [productosCargados, setProductosCargados]= useState([
        { id_producto: '', nombre_producto: "Totales", cantidad: '', precio: '', iva_5: 0, iva_10: 0, exenta: 0, subTotal: 0 }
    ]);

    function buscarProveedorDesdeRuc(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key !== "Enter") return;
        const cedula = parseInt((event.target as HTMLInputElement).value);
        obtenerProveedor(cedula).then((data) => {
            console.log(data);
            setNombreProveedor(data.nombre);
            setTituloBoton("Modificar cliente");
        });
    }

    function seleccionarProducto() {
        let cargados= [... productosCargados];
        let total_iva_5= 0;
        let total_iva_10= 0;
        let total_exenta= 0;
        let total= 0;
        cargados.pop(); // Elimina el pie
        // Agrega un producto

        // Calcula el monto
        cargados.forEach((producto) => {
            total_iva_5 += producto.iva_5;
            total_iva_10 += producto.iva_10;
            total_exenta += producto.exenta;
            total += producto.subTotal;
        });
        // Agrega el pie
        cargados.push(
            { id_producto: '', nombre_producto: "Totales", cantidad: '', precio: '', iva_5: total_iva_5, iva_10: total_iva_10, exenta: total_exenta, subTotal: total }
        );
        setProductosCargados(cargados);
    }

    return (<>
        <h1>Compra</h1>
        <Paper elevation={3}><Grid2
            container
            spacing={2}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            marginTop={2}>
            <TextField id="fecha_compra" label="Fecha" variant="outlined" type="date" value={fechaActual.toISOString().split("T")[0]}/>
            <Select id="tipo_documento" label="Tipo Documento" variant="outlined" defaultValue="Factura">
                <MenuItem value="Factura">Factura</MenuItem>
                <MenuItem value="Ticket">Ticket</MenuItem>
            </Select>
            <TextField id="num_factura" label="Numero Documento" variant="outlined" disabled/>
        </Grid2></Paper>
        <Paper elevation={3}><Grid2
            container
            spacing={2}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            marginTop={2}>
                <TextField id="document_proveedor" label="Documento" variant="outlined" onKeyUp={buscarProveedorDesdeRuc} sx={{width: 100}}/>
                <TextField id="nombre_proveedor" label="Nombre" variant="outlined" value={nombreProveedor} sx={{width: 400}}/>
                <Button onClick={() => {}}>{tituloBoton}</Button>
        </Grid2></Paper>
        <Paper elevation={3}><Grid2
            container
            spacing={2}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            marginTop={2}>
                <TablaProductos funcionSeleccionar={seleccionarProducto}/>
        </Grid2></Paper>
        <>
            <h1>Productos cargados</h1>
            <DataGrid
                columns={columnas}
                rows= {productosCargados}
                getRowId={(row) => row.id_producto} // Indica el campo id
                getRowSpacing={(params) => ({ top: params.isFirstVisible ? 0 : 5, bottom: params.isLastVisible ? 0 : 5 })} // Espacio entre filas
            ></DataGrid>
        </>
        <Grid2
            container
            spacing={2}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            marginTop={2}>
            <Button variant="contained" color="success" onClick={() => {}}>Imprimir</Button>
            <Button variant="contained" color="error" onClick={() => {setCompraVista(false);}}>Cancelar</Button>
        </Grid2>
    </>);
}