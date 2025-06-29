import { useState } from 'react';
import { Button, Grid2, PopoverVirtualElement } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function MenuAplicacion() {
    const [anchorEl, setAnchorEl] = useState<Element | PopoverVirtualElement | (() => Element | PopoverVirtualElement | null) | null | undefined>(null);
    const [opcionMenu, setOpcionMenu] = useState('');

    const estilo: React.CSSProperties = {
        top: 0,
        right: 0,
        position: 'fixed',
        width: '100vw',
        zIndex: 1000
    };

    function mostrarOcultarMenu(menu: string, evento: Element | PopoverVirtualElement | (() => Element | PopoverVirtualElement | null) | null | undefined) {
        setAnchorEl(evento);
        if (evento === null) {
            setOpcionMenu('');
        } else {
            setOpcionMenu(menu);
        }
    }

    return (
        <div style={estilo}>
            <Grid2 container spacing={2} sx={{ padding: 2 }}>
                <Grid2 size={{xs: 2}}>
                    <img src="/imagenes/logo.png" alt="Logo" style={{ width: '100%' }} onClick={() => {window.location.href= "/";}}/>
                </Grid2>
                <Grid2 size={{xs: 7}}>
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
                        <MenuItem onClick={() => {window.location.href= "/venta";mostrarOcultarMenu("ventasCompras", null);}}>Cargar Venta</MenuItem>
                        <MenuItem onClick={() => {window.location.href= "/compra";mostrarOcultarMenu("ventasCompras", null);}}>Cargar Compra</MenuItem>
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
                        <MenuItem onClick={() => {window.location.href= "/producto";mostrarOcultarMenu("gestionar", null);}}>Productos</MenuItem>
                        <MenuItem onClick={() => {window.location.href= "/cliente";mostrarOcultarMenu("gestionar", null);}}>Clientes</MenuItem>
                        <MenuItem onClick={() => {window.location.href= "/proveedor";mostrarOcultarMenu("gestionar", null);}}>Proveedores</MenuItem>
                        <MenuItem onClick={() => {window.location.href= "/usuario";mostrarOcultarMenu("gestionar", null);}}>Usuarios</MenuItem>
                    </Menu>
                    <Button variant="contained" color="primary" onClick={() => {window.location.href= "/ayuda";}}>Ayuda</Button>
                </Grid2>
                <Grid2 size={{xs: 3}} textAlign="end">
                    <Button variant="contained" color="primary" href="/login">Cerrar Sesion</Button>
                </Grid2>
            </Grid2>
        </div>
    );
}