import { useEffect, useState } from "react";
import { Rol } from "../../../models/usuarios";
import { recuperarRoles } from "../controllers/recuperar";
import Cargando from "../../../views/Cargando";
import { DataGrid, gridClasses, GridRowSelectionModel } from "@mui/x-data-grid";

export default function TablaRoles({setSeleccionar}: {setSeleccionar?: (rowSelectionModel: GridRowSelectionModel) => void | Promise<void>}) {
    const [cargando, setCargando] = useState(true);
    const [roles, setRoles] = useState<Rol[]>();

    const columnas = [
        { field: 'id_role', headerName: 'Id', flex: 0.1 },
        { field: 'nombres', headerName: 'Nombres', flex: 0.2 }
    ]

    function cargarListado() {
        recuperarRoles().then((data) => {
            setRoles(data);
        });
        setCargando(false);
    }

    useEffect(() => {
        cargarListado();
    }, []);

    return (<>
        {cargando ? <Cargando /> : 
        <DataGrid
            columns={columnas}
            columnVisibilityModel={{isEmpresa: false}}
            rows={roles}
            onRowSelectionModelChange= {setSeleccionar}
            getRowId={(row) => row.id_role} // Indica el campo id
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