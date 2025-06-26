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

        const estiloVentana: React.CSSProperties= {
            top: 50, 
            width: '100vw',
            position: 'absolute',
            zIndex: 10,
        };

    return (<>
        {ventaVista && <div style={estiloVentana}><Paper elevation={6} style={{marginInline: 'auto'}}><Venta setVentaVista={setVentaVista}/></Paper></div>}
        {compraVista && <div style={estiloVentana}><Paper elevation={6} style={{marginInline: 'auto'}}><Compra setCompraVista={setCompraVista}/></Paper></div>}
        {productoVista && <div style={estiloVentana}><Paper elevation={12} style={{marginInline: 'auto', width: '70vw'}}><ListadoProductos setProductoVista={setProductoVista}/></Paper></div>}
        {proveedorVista && <div style={estiloVentana}><Paper elevation={12} style={{marginInline: 'auto', width: '70vw'}}><ListadoProovedores setProveedorVista={setProveedorVista}/></Paper></div>}
        {clienteVista && <div style={estiloVentana}><Paper elevation={12} style={{marginInline: 'auto', width: '70vw'}}><ListadoClientes setClienteVista={setClienteVista}/></Paper></div>}
        {usuarioVista && <div style={estiloVentana}><Paper elevation={12} style={{marginInline: 'auto', width: '70vw'}}><ListadoUsuarios setUsuarioVista={setUsuarioVista}/></Paper></div>}
    </>);
}