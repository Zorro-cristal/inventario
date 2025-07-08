import { Route, Routes } from "react-router";
import { Principal } from "./components/principal";
import { Compra, ListadoClientes, ListadoProductos, ListadoProovedores, ListadoUsuarios, Venta } from "./components";
import EditarCliente from "./modulos/clientes/views/Editar";
import EditarProducto from "./modulos/productos/views/Editar";
import EditarProveedor from "./modulos/proveedor/views/Editar";
import EditarUsuario from "./modulos/usuarios/views/Editar";
import Factura from "./views/Factura";

export default function Rutas_principales() {
    return (
      <Routes>
        <Route path="/prueba" element={<Factura num_factura={"001-001"} />} />
        <Route path="/producto">
          <Route index element={<ListadoProductos />} />
          <Route path=":id" element={<EditarProducto />} />
        </Route>
        <Route path="/cliente">
          <Route index element={<ListadoClientes />} />
          <Route path=":id" element={<EditarCliente/>} />
        </Route>
        <Route path="/proveedor">
          <Route index element={<ListadoProovedores />} />
          <Route path=":id" element={<EditarProveedor/>} />
        </Route>
        <Route path="/usuario">
          <Route index element={<ListadoUsuarios />} />
          <Route path=":id" element={<EditarUsuario/>} />
        </Route>
        <Route path="/venta" element={<Venta/>} />
        <Route path="/compra" element={<Compra/>} />
        <Route path="/" element={<Principal/>} />
      </Routes>
    );
}