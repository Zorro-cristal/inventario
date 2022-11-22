<?php
    include './funcionesbdd.php';
    //Agregamos la nueva venta
    $fecha= $_POST['fecha'];
    $cedula= $_POST['cedula'];
    //Generamos el numero de factura
    $comando= 'INSERT INTO ventas(cliente_fk, fecha) VALUES (' . $cedula . ', STR_TO_DATE("' . $fecha . '", "%Y-%m-%d"))';
    echo "</br>Insertando en la tabla ventas</br>";
    echo ($comando);
    $idVenta= modificarBdd($comando);
    //Agregamos los productos asociados a la venta
    $canasta= $_POST['canasta'];
    $canasta= json_decode($canasta, true);
    $total= 0;
    //echo json_encode($canasta);
    for ($i= 0; $i < count($canasta); ++$i) {
        $comando= "INSERT INTO detalle_ventas(producto_fk, venta_fk, cantidad, descuento, precio_venta) VALUES (";
        echo "</br>Insertando en la tabla detalle_ventas</br>";
        echo $comando;
        if ($canasta[$i]['descuento'] == "" || isset($canasta[$i]['descuento'])){
            $comando= $comando . $canasta[$i]['id'] . ", " . $idVenta . ", " . $canasta[$i]['cantidad'] . ", 0, " . $canasta[$i]['precio'] . ")";
            //Se genera el monto total para casos de deudas
            $monto= floatval($canasta[$i]['precio']) * intval($canasta[$i]['cantidad']);
        } else {
            $comando= $comando . $canasta[$i]['id'] . ", " . $idVenta . ", " . $canasta[$i]['cantidad'] . ", " . $canasta[$i]['descuento'] . ", " . $canasta[$i]['precio'] . ")";
            //Se genera el monto total para casos de deudas
            $monto= (floatval($canasta[$i]['precio']) - floatval($canasta[$i]['descuento'])) * intval($canasta[$i]['cantidad']);
        }
        modificarBdd($comando);
        $total= $total + floatval($monto);
        //Se resta el producto del stock actual
        $comando= 'SELECT stock FROM productos WHERE id=' . $canasta[$i]['id'];
        $stock= conectarBdd($comando);
        $stock= (int)$stock[0]['stock'];
        if ($stock < $canasta[$i]['cantidad']) {
            $comando= 'UPDATE productos SET stock= 0 WHERE id= ' . $canasta[$i]['id'] . ';';
        } else{
            $stock= $stock - (int)$canasta[$i]['cantidad'];
            $comando= 'UPDATE productos SET stock= ' . $stock . ' WHERE id= ' . $canasta[$i]['id'] . ';';
        }
        echo "</br>Se actualiza el stock</br>";
        echo $comando;
        modificarBdd($comando);
    }
    //Se genera deuda
    $deuda= $_POST['deuda'];
    if (isset($deuda)) {
        $comando= 'UPDATE clientes SET deuda= ' . $total . ' WHERE cedula=' . $cedula;
        echo "</br>Se genera dueda? " . $deuda . "</br>";
        echo $comando;
        modificarBdd($comando);
    }
    header('Location: ../index.html');
?>