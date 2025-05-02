import { useState } from 'react';
import { Button, Grid2 } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function MenuAplicacion({ 
    setVentaVista,
    setCompraVista,
    setProductoVista,
    setProveedorVista,
    setClienteVista
}: {
    setVentaVista: (value: boolean) => void;
    setCompraVista: (value: boolean) => void;
    setProductoVista: (value: boolean) => void;
    setProveedorVista: (value: boolean) => void;
    setClienteVista: (value: boolean) => void;
}) {
    const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);
    const [opcionMenu, setOpcionMenu] = useState('');

    function mostrarOcultarMenu(menu: string, evento: EventTarget | null) {
        setAnchorEl(evento);
        if (evento === null) {
            setOpcionMenu('');
        } else {
            setOpcionMenu(menu);
        }
    }

    return (
        <>
            <Grid2 container spacing={2} sx={{ padding: 2 }}>
                <Grid2 size={{xs: 2}}>
                    <img src="/imagenes/logo.png" alt="Logo" style={{ width: '100%' }} />
                </Grid2>
                <Grid2 size={{xs: 6}}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={(e) => { mostrarOcultarMenu("ventasCompras", e.currentTarget);}}
                        aria-controls={opcionMenu === 'ventasCompras' ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={opcionMenu === 'ventasCompras' ? 'true' : undefined}
                    >
                        Ventas/Compras
                    </Button>
                    <Menu
                        open={opcionMenu === 'ventasCompras'}
                        anchorEl={anchorEl}
                        onClose={() => { mostrarOcultarMenu("ventasCompras", null); }}
                    >
                        <MenuItem onClick={() => {setVentaVista(true);mostrarOcultarMenu("ventasCompras", null);}}>Cargar Venta</MenuItem>
                        <MenuItem onClick={() => {setCompraVista(true);mostrarOcultarMenu("ventasCompras", null);}}>Cargar Compra</MenuItem>
                    </Menu>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={(e) => { mostrarOcultarMenu("gestionar", e.currentTarget);}}
                        aria-controls={opcionMenu === 'gestionar' ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={opcionMenu === 'gestionar' ? 'true' : undefined}>Gestionar</Button>
                    <Menu
                        open={opcionMenu === 'gestionar'}
                        anchorEl={anchorEl}
                        onClose={() => { mostrarOcultarMenu("gestionar", null); }}
                    >
                        <MenuItem onClick={() => {setProductoVista(true);mostrarOcultarMenu("gestionar", null);}}>Productos</MenuItem>
                        <MenuItem onClick={() => {setClienteVista(true);mostrarOcultarMenu("gestionar", null);}}>Clientes</MenuItem>
                        <MenuItem onClick={() => {setProveedorVista(true);mostrarOcultarMenu("gestionar", null);}}>Proveedores</MenuItem>
                    </Menu>
                    <Button variant="contained" color="primary" onClick={() => { setVentaVista(false); }}>Ayuda</Button>
                </Grid2>
                <Grid2 size={{xs: 3}}>
                    <Button variant="contained" color="primary" href="/login">Cerrar Sesion</Button>
                </Grid2>
            </Grid2>
        </>
    );
}