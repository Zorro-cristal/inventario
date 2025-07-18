import { Producto } from "../../../models/productos";

export function recuperarProductos(filtros: [string, string | number][] | undefined= undefined): Promise<Producto[]> {
    let productos: Producto[] = [];
    const resultados= [
        {
            id_producto: 1,
            nombre_producto: 'Producto 1',
            descripcion_producto: 'Descripción del producto 1',
            cantidad_disponible: 50,
            iva: 5,
            estado: 'activo',
            categoria: {
                id: 2,
                nombre: "categoria 2"
            }
        },
        {
            id_producto: 3,
            nombre_producto: 'Producto 2',
            descripcion_producto: 'Descripción del producto 2',
            cantidad_disponible: 20,
            estado: 'activo',
            iva: 10,
            categoria: {
                id: 1,
                nombre: "categoria 1"
            }
        }
    ];

    resultados.forEach((p) => {
        const prod: Producto= p;
        productos.push(prod);
    });

    return new Promise((resolve) => {
        resolve(productos);
    });
}