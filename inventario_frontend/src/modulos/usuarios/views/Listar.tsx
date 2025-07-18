import { useEffect, useState } from "react";
import Cargando from "../../../views/Cargando";
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid";
import { Usuario } from "../../../models/usuarios";
import { recuperarUsuarios } from "../controllers/recuperar";

export default function TablaUsuarios({setSeleccionar}: {setSeleccionar?: (rowSelectionModel: GridRowSelectionModel) => void | Promise<void>}) {
    const [cargando, setCargando] = useState(true);
    const [usuarios, setUsuarios] = useState([]);

    const columnas = [
        {field: 'alias', headerName: 'Alias', flex: 0.2},
        {field: 'rol', headerName: 'Rol', flex: 0.1},
        {field: 'estado', headerName: 'Estado', flex: 0.1}
    ];

    function cargarListado() {
        recuperarUsuarios().then((data) => {
            let list= [];
            data.forEach((d) => {
                const user: Usuario= d;
                list.push({
                    alias: user.alias,
                    rol: user.rol?.nombre,
                    estado: user.estado
                });
            });
            setUsuarios(list);
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
            rows={usuarios}
            onRowSelectionModelChange= {setSeleccionar}
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
                '& .MuiDataGrid-cell': {
                    color: '#000000', // Color del texto
                },
            }}
        ></DataGrid>}
    </>)
}