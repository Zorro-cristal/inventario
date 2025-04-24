import { useEffect, useState } from "react";
import { Proveedor } from "../../../models/proveedor";
import Cargando from "../../../views/Cargando";
import { DataGrid } from "@mui/x-data-grid";

export default function TablaProveedores() {
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
        setProveedores([
            {
                id_proveedor: 1,
                nombre: 'Proveedor 1',
                telefono: '123456789',
                direccion: 'Dirección del proveedor 1',
                ruc: '1234567890',
            },
            {
                id_proveedor: 2,
                nombre: 'Proveedor 2',
                telefono: '987654321',
                direccion: 'Dirección del proveedor 2',
                ruc: '0987654321',
            }
        ]);
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
                }}
            ></DataGrid>}
    </>);
}