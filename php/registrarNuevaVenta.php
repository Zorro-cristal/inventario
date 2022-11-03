<?php
    include './funcionesbdd.php';
    //Agregamos la nueva venta
    $fecha= $_POST['fecha'];
    $cedula= $_POST['cedula'];
    //Generamos el numero de factura
    $comando= 'INSERT INTO ventas(cedula, fecha) VALUES (' . $cedula . ', ' . $fecha . ')';
    $idVenta= modificarBdd($comando);
    //Agregamos los productos asociados a la venta
    $canasta= $_POST['canasta'];
    json_decode($canasta);
    $total= 0;
    for ($i= 0; $i < count($canasta); ++$i) {
        $comando= "INSERT INTO detalle_ventas(id_product, id_venta, cantidad, descuento) VALUES ";
        $comando= $comando . $canasta['id'] + ", " + $idVenta + ", " + $canasta['cantidad'] + ", " + $canasta['descuento'];
        modificarBdd($comando);
        $comando= "SELECT precio FROM productos WHERE id=" . $canasta['id'];
        $monto= conectarBdd($comando);
        $total= $total + floatval($monto);
    }
    //Se genera deuda
    $deuda= $_POST['deuda'];
    if (isset(deuda)) {
        $comando= 'UPDATE clientes SET deuda= ' . $total . ' WHERE cedula=' . $cedula;
        modificarBdd($comando);
    }
    header('Location: ../index.html');
?>