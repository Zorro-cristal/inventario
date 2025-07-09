import { useEffect, useState } from "react";
import { Permiso } from "../../../models/usuarios";
import { recuperarPermiso } from "../controllers/recuperar";
import { DataGrid, gridClasses, GridRowSelectionModel } from "@mui/x-data-grid";
import Cargando from "../../../views/Cargando";

export default function TablaPermisos({setSeleccionar, filtros}: {setSeleccionar?: (rowSelectionModel: GridRowSelectionModel) => void | Promise<void>, filtros?: [string, string | number][]}) {
    const [cargando, setCargando] = useState(true);
    const [permisos, setPermisos] = useState<Permiso[]>([]);

    const columnas = [
        { field: 'id_permiso', headerName: 'Id', flex: 0.2 },
        { field: 'nombre', headerName: 'Nombre', flex: 0.2 },
        { field: 'id_roleFK', headerName: 'Rol', flex: 0.2 },
    ]

    function cargarListado() {
        recuperarPermiso(filtros).then((data) => {
            setPermisos(data);
        });
        setCargando(false);
    }

    useEffect(() => cargarListado(), []);

    return (<>
        {cargando ? <Cargando/> :
        <DataGrid
            columns={columnas}
            rows={permisos}
            onRowSelectionModelChange= {setSeleccionar}
            getRowId={(row) => row.id_permiso} // Indica el campo id
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
                '& .MuiDataGrid-cell': {
                    color: '#000000', // Color del texto
                },
            }}
        ></DataGrid>}
    </>);
}
