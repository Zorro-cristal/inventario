import { Paper } from "@mui/material";
import Compra from "../modulos/ventaCompra/views/compra";
import Venta from "../modulos/ventaCompra/views/venta";
import ListadoClientes from "./listarClientes";
import ListadoProductos from "./listarProducto";
import ListadoProovedores from "./listarProveedores";
import ListadoUsuarios from "./listarUsuarios";

export function Principal({
    ventaVista: {ventaVista, setVentaVista},
    compraVista: {compraVista, setCompraVista},
    productoVista: {productoVista, setProductoVista},
    proveedorVista: {proveedorVista, setProveedorVista},
    clienteVista: {clienteVista, setClienteVista},
    usuarioVista: {usuarioVista, setUsuarioVista}
    }: {
        ventaVista: {ventaVista: boolean, setVentaVista: (value: boolean) => void},
        compraVista: {compraVista: boolean, setCompraVista: (value: boolean) => void},
        productoVista: {productoVista: boolean, setProductoVista: (value: boolean) => void},
        proveedorVista: {proveedorVista: boolean, setProveedorVista: (value: boolean) => void},
        clienteVista: {clienteVista: boolean, setClienteVista: (value: boolean) => void},
        usuarioVista: {usuarioVista: boolean, setUsuarioVista: (value: boolean) => void}
    }) {
    return (<>
        {ventaVista && <div style={{position: 'absolute', zIndex: 10}}><Paper elevation={6}><Venta setVentaVista={setVentaVista}/></Paper></div>}
        {compraVista && <div style={{position: 'absolute', zIndex: 10}}><Paper elevation={6}><Compra setCompraVista={setCompraVista}/></Paper></div>}
        {productoVista && <div style={{position: 'absolute', zIndex: 20}}><Paper elevation={12}><ListadoProductos setProductoVista={setProductoVista}/></Paper></div>}
        {proveedorVista && <div style={{position: 'absolute', zIndex: 20}}><Paper elevation={12}><ListadoProovedores setProveedorVista={setProveedorVista}/></Paper></div>}
        {clienteVista && <div style={{position: 'absolute', zIndex: 20}}><Paper elevation={12}><ListadoClientes setClienteVista={setClienteVista}/></Paper></div>}
        {usuarioVista && <div style={{position: 'absolute', zIndex: 20}}><Paper elevation={12}><ListadoUsuarios setUsuarioVista={setUsuarioVista}/></Paper></div>}
    </>);
}