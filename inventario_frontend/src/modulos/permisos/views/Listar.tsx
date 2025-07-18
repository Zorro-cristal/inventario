import { useEffect, useState } from "react";
import { Permiso } from "../../../models/usuarios";
import { recuperarPermiso } from "../controllers/recuperar";
import { DataGrid, gridClasses, GridRowSelectionModel } from "@mui/x-data-grid";
import Cargando from "../../../views/Cargando";

export default function TablaPermisos({setSeleccionar, filtros}: {setSeleccionar?: (rowSelectionModel: GridRowSelectionModel) => void | Promise<void>, filtros?: [string, string | number][]}) {
    const [cargando, setCargando] = useState(true);
    const [permisos, setPermisos] = useState<Permiso[]>([]);
    
    const idRole = filtros?.find(filtro => filtro[0] === 'id_role')?.[1];console.log(idRole)

    const columnas = [
        { field: 'id_permiso', headerName: 'Id', flex: 0.1,  width: 50 },
        { field: 'nombre', headerName: 'Nombre', flex: 0.2 },
        { field: 'descripcion', headerName: 'Descripcion', flex: 0.2 },
        {
            field: 'id_roleFK',
            headerName: 'Asignado',
            flex: 0.1,
            renderCell: (params) => (
                <input
                    type="checkbox"
                    checked={params.value == idRole}
                    onChange={(e) => {
                        if (params.row.id_permiso) {
                            console.log("Implementacion de cambio pendiente",params.row.id_permiso, e.target.checked);
                        }
                    }}
                />
            ),
        }
    ];

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
