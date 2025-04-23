import { useEffect, useState } from "react";
import { camposCliente, Cliente } from "../../../models/clientes";
import { buscarCliente, guardarCliente } from "../funciones/abm";
import { camposForm, Formulario } from "../../../views/Formulario";
import { Paper } from "@mui/material";

export default function EditarCliente({id_cliente}: {id_cliente: number}) {
    const [cargado, setCargado]= useState(false);
    const [cliente, setCliente]= useState<Cliente>({
        cedula: id_cliente,
        isEmpresa: false,
        ruc: 0,
        deuda: 0,
    });
    const [titulo, setTitulo]= useState("Agregar nuevo cliente");
    const [camposFormCliente, setCamposFormCliente]= useState(camposCliente);

    useEffect(() => {
        let camposForm= [...camposFormCliente];
        if (id_cliente != undefined && id_cliente != 0) {
            setTitulo("Modificar el cliente");
            buscarCliente(id_cliente).then((data: Cliente) => {
                setCliente(data);
                camposForm= camposForm.filter((c: camposForm) => {
                    if (data.isEmpresa) {
                        return !((c.id === "nombres") || (c.id === "apellidos"));
                    } else {
                        return !((c.id === "razon_social") || (c.id === "nombre_empresa"));
                    }
                });
                console.log(camposForm);
                setCamposFormCliente(camposForm);
                setCargado(true);
            });
        } else {
            setCargado(true);
        }
    }, []);

    if (cargado) {
        return (<Paper elevation={3}>
            <h1>{titulo}</h1>
            <Formulario valores={cliente} campos={camposFormCliente} funcionSubmit={guardarCliente}/>
        </Paper>);
    } else {
        return (<div><h1>Cargando...</h1></div>);
    }
}