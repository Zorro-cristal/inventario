import { Route, Routes } from "react-router";
import EditarProducto from "./modulos/productos/views/Editar";
import ListadoProductos from "./modulos/productos/views/Listar";

export default function Rutas_principales() {
    return (
      <Routes>
        <Route path="/prueba/:id" element={<EditarProducto />} />
        <Route path="/productos">
          <Route index element={<ListadoProductos />} />
          <Route path=":id" element={<EditarProducto />} />
        </Route>
      </Routes>
    );
}