import { DataGrid, gridClasses, GridRowSelectionModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Cargando from "../../../views/Cargando";
import { recuperarProductos } from "../controllers/recuperar";

export default function TablaProductos({setSeleccionar}: {setSeleccionar?: (rowSelectionModel: GridRowSelectionModel) => void | Promise<void>}) {
    const [cargando, setCargando]= useState(true);
    const [productos, setProductos]= useState([]);

    const columnas = [
        { field: 'id_producto', headerName: 'ID', flex: 0.1 },
        { field: 'nombre_producto', headerName: 'Nombre', flex: 0.2 },
        { field: 'categoria', headerName: 'Categoria', flex: 0.1 },
        { field: 'cantidad_disponible', headerName: 'Cantidad Disponible', flex: 0.1 },
        { field: 'iva', headerName: 'IVA', flex: 0.1 },
        { field: 'estado', headerName: 'Estado', flex: 0.1 },
    ];

    function cargarListado() {
        recuperarProductos().then((data) => {
            let prods= [];
            data.forEach(p => {
                prods.push({
                    'id_producto': p.id_producto,
                    'cantidad_disponible': p.cantidad_disponible,
                    'nombre_producto': p.nombre_producto,
                    'estado': p.estado,
                    'iva': p.iva,
                    'categoria': p.categoria?.nombre
                });
            });
            setProductos(prods);
        });
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