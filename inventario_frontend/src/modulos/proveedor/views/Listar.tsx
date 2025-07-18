import { useEffect, useState } from "react";
import { Proveedor } from "../../../models/proveedor";
import Cargando from "../../../views/Cargando";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { recuperarProveedores } from "../controllers/recuperar";

export default function TablaProveedores({setSeleccionar}: {setSeleccionar?: (rowSelectionModel: GridRowSelectionModel) => void | Promise<void>}) {
    const [cargando, setCargando] = useState(true);
    const [proveedores, setProveedores] = useState<Proveedor[]>([]);

    const columnas = [
        { field: 'id_proveedor', headerName: 'ID', flex: 0.1 },
        { field: 'nombre_proveedor', headerName: 'Nombre', flex: 0.2 },
        { field: 'telefono', headerName: 'Teléfono', flex: 0.2 },
        { field: 'direccion', headerName: 'Dirección', flex: 0.3 },
        { field: 'ruc', headerName: 'RUC', flex: 0.2 },
    ];

    function cargarListado() {
        setProveedores(recuperarProveedores());
        setCargando(false);
    }

    useEffect(() => {
        cargarListado();
    }, []);

    return (<>
        {cargando ? <Cargando/> :
            <DataGrid
                columns={columnas}
                rows={proveedores}
                onRowSelectionModelChange= {setSeleccionar}
                getRowId={(row) => row.id_proveedor} // Indica el campo id
                getRowSpacing={(params) => ({ top: params.isFirstVisible ? 0 : 5, bottom: params.isLastVisible ? 0 : 5 })} // Espacio entre filas
                sx={{
                    ['& .MuiDataGrid-row']: {
                        color: "white"
                    },
                    ['& .MuiToolbar-root']: {
                        color: "white"
                    },
                    ['& .MuiDataGrid-selectedRowCount']: {
                        color: "white"
                    },
                    '& .MuiDataGrid-cell': {
                        color: '#000000', // Color del texto
                    },
                }}
            ></DataGrid>}
    </>);
}