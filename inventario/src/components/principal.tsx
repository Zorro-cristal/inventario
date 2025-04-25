import Venta from "../modulos/ventaCompra/views/venta";
import ListadoProductos from "./listarProducto";

export function Principal({
    ventaVista: {ventaVista, setVentaVista},
    productoVista: {productoVista, setProductoVista}
    }: {
        ventaVista: {ventaVista: boolean, setVentaVista: (value: boolean) => void},
        productoVista: {productoVista: boolean, setProductoVista: (value: boolean) => void}
    }) {
    return (<>
        {ventaVista && <Venta setVentaVista={setVentaVista}/>}
        {productoVista && <ListadoProductos setProductoVista={setProductoVista}/>}
    </>);
}