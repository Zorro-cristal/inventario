import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";
import './index.css';
import Rutas_principales from './rutas_principales.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Rutas_principales />
    </BrowserRouter>
  </StrictMode>,
)
