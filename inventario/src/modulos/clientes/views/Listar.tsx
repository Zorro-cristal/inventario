import { DataGrid, gridClasses, GridRowSelectionModel } from "@mui/x-data-grid";
import Cargando from "../../../views/Cargando";
import { useEffect, useState } from "react";
import { Cliente } from "../../../models/clientes";
import recuperarClientes from "../controllers/recuperar";

export default function TablaClientes({setSeleccionar}: {setSeleccionar?: (rowSelectionModel: GridRowSelectionModel) => void | Promise<void>}) {
    const [cargando, setCargando] = useState(true);
    const [clientes, setClientes] = useState<Cliente[]>([]);

    const columnas = [
        { field: 'cedula', headerName: 'Cédula', flex: 0.1 },
        { field: 'nombres', headerName: 'Nombres', flex: 0.2 },
        { field: 'apellidos', headerName: 'Apellidos', flex: 0.2 },
        { field: 'isEmpresa', headerName: 'Es Empresa', flex: 0.1 },
        { field: 'razon_social', headerName: 'Razón Social', flex: 0.2 },
        { field: 'nombre_empresa', headerName: 'Nombre Empresa', flex: 0.2 },
        { field: 'ruc', headerName: 'RUC', flex: 0.1 },
        { field: 'deuda', headerName: 'Deuda', flex: 0.1 },
    ];

    function cargarListado() {
        recuperarClientes().then((data) => {
            setClientes(data);
        });
        setCargando(false);
    }

    useEffect(() => {
        cargarListado();
    }, []);

    return (<>
    {cargando ? <Cargando/> :
        <DataGrid
            columns={columnas}
            columnVisibilityModel={{isEmpresa: false}}
            rows={clientes}
            onRowSelectionModelChange= {setSeleccionar}
            getRowId={(row) => row.cedula} // Indica el campo id
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