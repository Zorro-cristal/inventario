import { Producto } from "../../../models/productos";

export function recuperarProductos(filtros: {clave: string, valor: string | number}[] | undefined= undefined): Producto[] {
    let productos: Producto[] = [];
    const resultados= [
        {
            id_producto: 1,
            nombre_producto: 'Producto 1',
            descripcion_producto: 'Descripción del producto 1',
            cantidad_disponible: 50,
            precio_venta: 120.5,
            iva: 5
        },
        {
            id_producto: 3,
            nombre_producto: 'Producto 2',
            descripcion_producto: 'Descripción del producto 2',
            cantidad_disponible: 20,
            precio_venta: 85.0,
            iva: 10
        }
    ];

    resultados.forEach((p) => {
        const prod: Producto= p;
        productos.push(prod);
    });

    return productos;
}