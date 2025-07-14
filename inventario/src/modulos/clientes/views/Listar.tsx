import { DataGrid, gridClasses, GridRowSelectionModel } from "@mui/x-data-grid";
import Cargando from "../../../views/Cargando";
import { useEffect, useState } from "react";
import { Cliente } from "../../../models/clientes";
import recuperarClientes from "../controllers/recuperar";

export default function TablaClientes({setSeleccionar}: {setSeleccionar?: (rowSelectionModel: GridRowSelectionModel) => void | Promise<void>}) {
    const [cargando, setCargando] = useState(true);
    const [clientes, setClientes] = useState([]);

    const columnas = [
        { field: 'id', headerName: 'Id', flex: 0.1 },
        { field: 'ruc', headerName: 'RUC', flex: 0.1 },
        { field: 'nombre_completo', headerName: 'Nombre completo', flex: 0.2 },
        { field: 'estado', headerName: 'Estado', flex: 0.1 },
        { field: 'isEmpresa', headerName: 'Es Empresa', flex: 0.1 },
        { field: 'deuda', headerName: 'Deuda', flex: 0.1 },
    ];

    function cargarListado() {
        recuperarClientes().then((data: Cliente[]) => {
            let client= [];
            data.forEach(e => {
                client.push({
                    'id': e.id,
                    'isEmpresa': e.isEmpresa,
                    'nombreCompleto': (e.isEmpresa ? (e.empresa?.nombre) : (e.persona?.nombres + " " + e.persona?.apellidos)),
                    'deuda': e.deuda,
                    'ruc': (e.isEmpresa ? (e.empresa?.ruc) : (e.persona?.ci+"-"+e.persona?.ruc)),
                });
            });
            setClientes(client);
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
            getRowId={(row) => row.id} // Indica el campo id
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