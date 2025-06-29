import { Route, Routes } from "react-router";
import EditarProducto from "./modulos/productos/views/Editar";
import ListadoProductos from "./modulos/productos/views/Listar";
import Venta from "./modulos/ventaCompra/views/venta";
import { Principal } from "./components/principal";
import EditarCliente from "./modulos/clientes/views/Editar";
import TablaClientes from "./modulos/clientes/views/Listar";
import EditarProveedor from "./modulos/proveedor/views/Editar";
import TablaProveedores from "./modulos/proveedor/views/Listar";

export default function Rutas_principales() {
    return (
      <Routes>
        <Route path="/prueba/:id" element={<EditarProducto />} />
        <Route path="/productos">
          <Route index element={<ListadoProductos />} />
          <Route path=":id" element={<EditarProducto />} />
        </Route>
        <Route path="/venta" element={<Venta/>} />
        <Route path="/cliente">
          <Route index element={<TablaClientes />} />
          <Route path=":id" element={<EditarCliente id_cliente={1}/>} />
        </Route>
        <Route path="/proveedor">
          <Route index element={<TablaProveedores />}></Route>
          <Route path=":id" element={<EditarProveedor id_proveedor={1}/>} />
        </Route>
        <Route path=":id" element={<Principal/>} />
      </Routes>
    );
}