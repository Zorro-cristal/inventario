import Venta from "../modulos/ventaCompra/views/venta";
import ListadoClientes from "./listarClientes";
import ListadoProductos from "./listarProducto";
import ListadoProovedores from "./listarProveedores";

export function Principal({
    ventaVista: {ventaVista, setVentaVista},
    productoVista: {productoVista, setProductoVista},
    proveedorVista: {proveedorVista, setProveedorVista},
    clienteVista: {clienteVista, setClienteVista}
    }: {
        ventaVista: {ventaVista: boolean, setVentaVista: (value: boolean) => void},
        productoVista: {productoVista: boolean, setProductoVista: (value: boolean) => void},
        proveedorVista: {proveedorVista: boolean, setProveedorVista: (value: boolean) => void},
        clienteVista: {clienteVista: boolean, setClienteVista: (value: boolean) => void}
    }) {
    return (<>
        {ventaVista && <div style={{position: 'absolute', zIndex: 10}}><Venta setVentaVista={setVentaVista}/></div>}
        {productoVista && <div style={{position: 'absolute', zIndex: 20}}><ListadoProductos setProductoVista={setProductoVista}/></div>}
        {proveedorVista && <div style={{position: 'absolute', zIndex: 2}}><ListadoProovedores setProveedorVista={setProveedorVista}/></div>}
        {clienteVista && <div style={{position: 'absolute', zIndex: 2}}><ListadoClientes setClienteVista={setClienteVista}/></div>}
    </>);
}