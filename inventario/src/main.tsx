import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";
import './index.css';
import MenuAplicacion from './components/menu.tsx';
import Rutas_principales from './rutas_principales.tsx';
import { Paper } from '@mui/material';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

export const informacion_empresa= {
  razon_social: 'nombre legal empresa',
  ruc: '123456789-0',
  direccion: 'sobre la calle entre la esquina y la otra esquina',
  ciudad: 'Villarrica - Paraguay',
  telefono: '+595989123456'
}

function App() {

  const estiloVentana: React.CSSProperties= {
      top: 50, 
      width: '100vw',
      position: 'absolute',
      zIndex: 10,
  };

  return (
      <BrowserRouter>
          <MenuAplicacion />
          <div style={estiloVentana}>
            <Paper elevation={6} style={{marginInline: 'auto'}}>
              <Rutas_principales/>
            </Paper></div>
      </BrowserRouter>
  );
}