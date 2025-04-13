import { Box, Button, CircularProgress, Grid2, IconButton, Stack } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Producto } from "../../../models/productos";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';

export default function ListadoProductos() {
    const navigate = useNavigate();

    const [cargando, setCargando]= useState(true);
    const [productos, setProductos]= useState<Producto[]>([]);

    const columnas = [
        { field: 'id_producto', headerName: 'ID', flex: 0.1 },
        { field: 'nombre_producto', headerName: 'Nombre', flex: 0.2 },
        { field: 'descripcion_producto', headerName: 'Descripción', flex: 0.3 },
        { field: 'cantidad_disponible', headerName: 'Cantidad Disponible', flex: 0.1 },
        { field: 'precio_venta', headerName: 'Precio de Venta', flex: 0.2 },
        {
            field: 'acciones',
            headerName: 'Acciones',
            flex: 0.1,
            renderCell: (params) => (
              <IconButton
                color="primary"
                size="large"
                onClick={() => navigate(`/productos/${params.id}`)}
              >
                <EditOutlinedIcon fontSize="inherit" />
              </IconButton>
            ),
          },
        
    ];

    function cargarListado() {
        setProductos([
            {
                id_producto: 1,
                nombre_producto: 'Producto 1',
                descripcion_producto: 'Descripción del producto 1',
                cantidad_disponible: 50,
                precio_venta: 120.5,
            },
            {
                id_producto: 2,
                nombre_producto: 'Producto 2',
                descripcion_producto: 'Descripción del producto 2',
                cantidad_disponible: 20,
                precio_venta: 85.0,
            }
        ]);
        setCargando(false);
    }
    
    useEffect(() => {
        cargarListado();
    }, []);

    return (
        <Box>
            <h1>Listado Productos</h1>
            {cargando
            ? <Stack
                direction="row"
                sx={{
                    justifyContent: "space-around",
                    alignItems: "center",
                }}
            >
                <CircularProgress size="3rem" />
            </Stack>
            : <DataGrid 
                columns={columnas}
                rows= {productos}
                getRowId={(row) => row.id_producto} // Indica el campo id
                getRowSpacing={(params) => ({ top: params.isFirstVisible ? 0 : 5, bottom: params.isLastVisible ? 0 : 5 })} // Espacio entre filas
                sx={{
                    ['& .'+gridClasses.row]: {
                        color: "white"
                    },
                    ['& .MuiToolbar-root']: {
                        color: "white"
                    },
                    ['& .MuiDataGrid-selectedRowCount']: {
                        color: "white"
                    },
                }}
                >
            </DataGrid>}
            <Grid2
                container
                spacing={2}
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                marginTop={2}
            > 
                <Grid2 size={{xs: 6}}> 
                    <Button>Agregar producto</Button>
                </Grid2>
                <Grid2 size={{xs: 6}}> 
                    <Button>Volver</Button>
                </Grid2>
            </Grid2> 
        </Box>
    );
}