export interface cliente {
    cedula : number;
    isEmpresa : boolean | number
    nombres : number | null;
    apellidos : number | null;
    razon_social : string | null;
    nombre_empresa : string | null;
    ruc : number;
    direccion: string | null;
    fecha_nacimiento : Date | string | null;
    deuda : number;
}