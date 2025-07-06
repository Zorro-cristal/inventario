import { DataGrid, gridClasses, GridRowSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Producto } from "../../../models/productos";
import Cargando from "../../../views/Cargando";
import { recuperarProductos } from "../controllers/recuperar";

export default function TablaProductos({setSeleccionar}: {setSeleccionar?: (rowSelectionModel: GridRowSelectionModel) => void | Promise<void>}) {
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
        setProductos(recuperarProductos());
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
                onRowSelectionModelChange= {setSeleccionar}
                getRowId={(row) => row.id_producto} // Indica el campo id
                getRowSpacing={(params) => ({ top: params.isFirstVisible ? 0 : 5, bottom: params.isLastVisible ? 0 : 5 })} // Espacio entre filas
                sx={{
                    ['& .'+gridClasses.row]: {
                        color: "white"
                    },
                    ['& .MuiToolbar-root']: {
                        color: "white"
                    },
                    '& .MuiDataGrid-cell': {
                        color: '#000000', // Color del texto
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