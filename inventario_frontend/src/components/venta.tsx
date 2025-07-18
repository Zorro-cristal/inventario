import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid2, IconButton, MenuItem, Modal, Paper, Select, TextField } from "@mui/material";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { useState } from "react";
import EditarCliente from '../modulos/clientes/views/Editar';
import TablaProductos from "../modulos/productos/views/Listar";
import { Cliente } from '../models/clientes';
import recuperarClientes from '../modulos/clientes/controllers/recuperar';

export default function Venta() {
    const [nombreCliente, setNombreCliente]= useState<string>("");
    const [cedula, setCedula]= useState<number>();
    const [seleccionProducto, setSeleccionProducto]= useState<GridRowSelectionModel>([]);
    const [productosCargados, setProductosCargados]= useState([
        { id_producto: '', nombre_producto: "Totales", cantidad: '', precio: '', iva_5: 0, iva_10: 0, exenta: 0, subTotal: 0 }
    ]);

    // Controladores de vista
    const [verEditarCliente, setVerEditarCliente] = useState(false);

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
    
    function buscarClienteDesdeCI(event: React.KeyboardEvent<HTMLDivElement>) {
        if (event.key !== "Enter") return;
        const cedula = parseInt((event.target as HTMLInputElement).value);
        setCedula(cedula);
        recuperarClientes([['cedula', cedula]]).then((data) => {
            console.log(data);
            const cliente: Cliente= data[0];
            setNombreCliente(cliente.nombres + " " + cliente.apellidos);
        });
    }
    
    const fechaActual = new Date();
    const num_factura= '0001';
    const columnas = [
        { field: 'id_producto', headerName: 'ID', flex: 0.1 },
        { field: 'nombre_producto', headerName: 'Nombre', flex: 0.2 },
        { field: 'cantidad', headerName: 'Cantidad Disponible', flex: 0.1, editable: true },
        { field: 'precio', headerName: 'Precio unitario', flex: 0.2 },
        { field: 'iva_5', headerName: 'Iva 5%', flex: 0.1 },
        { field: 'iva_10', headerName: 'Iva 10%', flex: 0.1 },
        { field: 'exenta', headerName: 'Exenta', flex: 0.1 },
        { field: 'subTotal', headerName: 'Precio de Venta', flex: 0.2 },
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

    function guardarVenta() {
        const formData= {
            'productos_cargados': JSON.stringify(productosCargados),
            'tipo_documento': (document.getElementById("tipo_documento") as HTMLInputElement).value,
            'fecha': (document.getElementById("fecha_compra") as HTMLInputElement).value,
            'num_factura': (document.getElementById("num_factura") as HTMLInputElement).value,
            'ruc_proveedor': (document.getElementById("document_proveedor") as HTMLInputElement).value,
        };
    }

    return (<Box sx={{ margin: 2 }}>
            <h1>Venta</h1>
                <Paper elevation={3}><Grid2
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    marginTop={2}>
                        <TextField id="fecha_venta" label="Fecha" variant="outlined" type="date" value={fechaActual.toISOString().split("T")[0]}/>
                        <Select id="tipo_venta" label="Tipo Venta" variant="outlined" defaultValue="Contado">
                            <MenuItem value="Contado">Contado</MenuItem>
                            <MenuItem value="Credito">Credito</MenuItem>
                        </Select>
                        <Select id="tipo_documento" label="Tipo Documento" variant="outlined" defaultValue="Factura">
                            <MenuItem value="Factura">Factura</MenuItem>
                            <MenuItem value="Ticket">Ticket</MenuItem>
                        </Select>
                        <Select id="local" label="Local" variant="outlined">
                            <MenuItem value="001">Central</MenuItem>
                        </Select>
                        <TextField id="num_factura" label="Numero Factura" variant="outlined" disabled value={num_factura}/>
                </Grid2></Paper>
                <Paper elevation={3}><Grid2
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    marginTop={2}>
                        <TextField id="document_cliente" label="Documento" variant="outlined" onKeyUp={buscarClienteDesdeCI} sx={{width: 100}}/>
                        <TextField id="nombre_cliente" label="Nombre" variant="outlined" value={nombreCliente} sx={{width: 400}}/>
                        <Button onClick={() => setVerEditarCliente(true)}>{nombreCliente.length > 0 ? "Modificar cliente" : "Nuevo cliente"}</Button>
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
                    <Button variant="contained" color="success" onClick={guardarVenta}>Imprimir</Button>
                    <Button variant="contained" color="error" onClick={() => {window.history.back()}}>Cancelar</Button>
                </Grid2>
            <Modal
                open={verEditarCliente}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflowY: 'auto', // Habilita el scroll en el modal padre
                }}
                >
                <EditarCliente setVista={setVerEditarCliente} id={cedula} />
            </Modal>
        </Box>
    );
}