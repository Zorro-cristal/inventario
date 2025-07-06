import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid2, IconButton, MenuItem, Modal, Paper, Select, TextField } from "@mui/material";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { useState } from "react";
import { Producto } from '../models/productos';
import { obtener_producto } from '../modulos/productos/funciones/abm';
import TablaProductos from "../modulos/productos/views/Listar";
import { obtenerProveedor } from '../modulos/proveedor/funciones/abm';
import EditarProveedor from '../modulos/proveedor/views/Editar';
import EditarProducto from '../modulos/productos/views/Editar';
import { Proveedor } from '../models/proveedor';

export default function Compra() {
    const fechaActual = new Date();
    const columnas = [
        { field: 'id_producto', headerName: 'id_proveedor', flex: 0.1 },
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

    // Controladores de vista
    const [verEditarProveedor, setVerEditarProveedor] = useState(false);
    const [verEditarProducto, setVerEditarProducto] = useState(false);

    const [proveedor, setProveedor] = useState<Proveedor>();
    const [seleccionProducto, setSeleccionProducto]= useState<GridRowSelectionModel>([]);
    const [productosCargados, setProductosCargados]= useState<{
        id_producto : string | number, nombre_producto: string, cantidad: number | null, precio: number | null, iva_5: number, iva_10: number, exenta: number, subTotal: number
    }[]>([
        { id_producto: '', nombre_producto: "Totales", cantidad: null, precio: null, iva_5: 0, iva_10: 0, exenta: 0, subTotal: 0 }
    ]);

    function buscarProveedorDesdeRuc(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key !== "Enter") return;
        const cedula = parseInt((event.target as HTMLInputElement).value);
        obtenerProveedor(cedula).then((data) => {
            console.log(data);
            if (data) {
                setProveedor(data[0])
            }
        });
    }

    async function seleccionarProducto() {
        let cargados= [... productosCargados];
        let total_iva_5= 0;
        let total_iva_10= 0;
        let total_exenta= 0;
        let total= 0;
        cargados.pop(); // Elimina el pie
        // Agrega un producto
        const producto : Producto[]= await obtener_producto(parseInt(seleccionado[0].toString()));
        console.log(producto);
        if (producto.length == 1) {
            cargados.push({
                id_producto: producto[0].id_producto,
                nombre_producto: producto[0].nombre_producto,
                cantidad: 1,
                precio: producto[0].precio_venta,
                iva_5: producto[0].iva == 5 ? producto[0].precio_venta : 0,
                iva_10: producto[0].iva == 10 ? producto[0].precio_venta : 0,
                exenta: producto[0].iva == 0 ? producto[0].precio_venta : 0,
                subTotal: producto[0].precio_venta
            });
        }

        // Calcula el monto
        cargados.forEach((producto) => {
            total_iva_5 += producto.iva_5;
            total_iva_10 += producto.iva_10;
            total_exenta += producto.exenta;
            total += producto.subTotal;
        });
        // Agrega el pie
        cargados.push(
            { id_producto: '', nombre_producto: "Totales", cantidad: null, precio: null, iva_5: total_iva_5, iva_10: total_iva_10, exenta: total_exenta, subTotal: total }
        );
        setProductosCargados(cargados);
    }

    function guardarCompra() {
        
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
                <TextField id="nombre_proveedor" label="Nombre" variant="outlined" value={proveedor ? proveedor['nombre'] : ""} sx={{width: 400}}/>
                <Button onClick={() => {}}>{proveedor ? "Agregar proveedor" : "Editar proveedor"}</Button>
        </Grid2></Paper>
        <Paper elevation={3}><Grid2
            container
            spacing={2}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            marginTop={2}>
            <TablaProductos setSeleccionar={setSeleccionProducto}/>
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
            <Button variant="contained" color="success" onClick={guardarCompra}>Imprimir</Button>
            <Button variant="contained" color="error" onClick={() => {window.history.back();}}>Cancelar</Button>
        </Grid2>
        <Modal
            open={verEditarProveedor}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflowY: 'auto', // Habilita el scroll en el modal padre
            }}
            >
            <EditarProveedor setVista={setVerEditarProveedor} id={proveedor ? proveedor['id_proveedor'] : 0} />
        </Modal>
        <Modal
            open={verEditarProducto}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflowY: 'auto', // Habilita el scroll en el modal padre
            }}
            >
            <EditarProducto setVista={setVerEditarProducto} id={seleccionProducto ? parseInt(seleccionProducto[0].toString()) : 0} />
        </Modal>
    </>);
}