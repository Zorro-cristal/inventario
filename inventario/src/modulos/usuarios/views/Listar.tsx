import { useEffect, useState } from "react";
import Cargando from "../../../views/Cargando";
import { DataGrid } from "@mui/x-data-grid";
import { Usuario } from "../../../models/usuarios";

export default function TablaUsuarios() {
    const [cargando, setCargando] = useState(true);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    const columnas = [
        {field: 'alias', headerName: 'Alias', flex: 0.2},
        {field: 'role_id', headerName: 'Rol', flex: 0.1},
        {field: 'contra', headerName: 'Contra', flex: 0.1, visibility: false},
    ];

    function cargarListado() {
        setUsuarios([
            {
                alias: 'Zorro-cristal',
                id_roleFK: 1,
                contra: ""
            },
            {
                alias: 'Otro-cristal',
                id_roleFK: 2,
                contra: ""
            },
        ]);
        setCargando(false);
    }

    useEffect(() => {
        cargarListado();
    }, []);

    return (<>
        {cargando ? <Cargando /> : 
        <DataGrid
            columns={columnas}
            rows={usuarios}
            getRowId={(row) => row.alias} // Indica el campo id
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
            }}
        ></DataGrid>}
    </>)
}