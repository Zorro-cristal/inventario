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
        {ventaVista && <Venta setVentaVista={setVentaVista}/>}
        {productoVista && <ListadoProductos setProductoVista={setProductoVista}/>}
        {proveedorVista && <ListadoProovedores setProveedorVista={setProveedorVista}/>}
        {clienteVista && <ListadoClientes setClienteVista={setClienteVista}/>}
    </>);
}