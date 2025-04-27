import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";
import './index.css';
import { Principal } from './components/principal.tsx';
import MenuAplicacion from './components/menu.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

function App() {
  const [ventaVista, setVentaVista] = useState(false);
  const [productoVista, setProductoVista] = useState(false);
  const [proveedorVista, setProveedorVista] = useState(false);
  const [clienteVista, setClienteVista] = useState(false);

  return (
      <BrowserRouter>
          <MenuAplicacion 
            setVentaVista={setVentaVista}
            setProductoVista={setProductoVista}
            setProveedorVista={setProveedorVista}
            setClienteVista={setClienteVista}
            />
            <Principal 
              ventaVista={{ventaVista, setVentaVista}} 
              productoVista= {{productoVista, setProductoVista}}
              proveedorVista= {{proveedorVista, setProveedorVista}}
              clienteVista= {{clienteVista, setClienteVista}}/>
      </BrowserRouter>
  );
}