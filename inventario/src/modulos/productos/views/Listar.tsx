import { CircularProgress, Stack } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Producto } from "../../../models/productos";
import Cargando from "../../../views/Cargando";

export default function TablaProductos({funcionSeleccionar}: {funcionSeleccionar?: () => void}) {

    const [cargando, setCargando]= useState(true);
    const [productos, setProductos]= useState<Producto[]>([]);

    const columnas = [
        { field: 'id_producto', headerName: 'ID', flex: 0.1 },
        { field: 'nombre_producto', headerName: 'Nombre', flex: 0.2 },
        { field: 'descripcion_producto', headerName: 'Descripción', flex: 0.3 },
        { field: 'cantidad_disponible', headerName: 'Cantidad Disponible', flex: 0.1 },
        { field: 'precio_venta', headerName: 'Precio de Venta', flex: 0.2 },
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
        <>
            {cargando
            ? <Cargando/>
            : <DataGrid 
                columns={columnas}
                rows= {productos}
                onRowSelectionModelChange= {funcionSeleccionar}
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
       </>
    );
}