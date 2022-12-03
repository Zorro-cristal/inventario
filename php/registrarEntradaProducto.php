<?php
    include './funcionesbdd.php';
    $id_product= $_POST['lista_producto'];
    $id_prov= $_POST['lista_proveedor'];
    $iva= $_POST['iva'];
    echo "lista_prodcto= " . $id_product;
    echo "</br>";
    echo "lista_proveedor= " . $id_prov;
    echo "</br>";
    $stock_actual= (int)$_POST['stock'];
    $stock= (int)$_POST['sumar'];
    $precio= $_POST['precio'];
    $precio_compra= $_POST['precio_compr'];
    $fecha= $_POST['fecha'];
    $id_prov= $_POST['lista_proveedor'];
    $comando= "INSERT INTO ingresos_productos(proveedor_fk, producto_fk, fecha_ingreso, cantidad, precio_unitario) VALUES ( " . $id_prov . ", " . $id_product . ', STR_TO_DATE("' . $fecha . '", "%Y-%m-%d"), ' . $stock . ", " . $precio_compra . ")";
    echo $comando;
    echo "</br>";
    modificarBdd($comando);
    $stock= $stock_actual + $stock;
    $comando= "UPDATE productos SET stock= " . $stock . ", precio_venta= " . $precio . ", iva= '" . $iva . "' WHERE id=" . $id_product . ";";
    modificarBdd($comando);
    echo $comando;
    header('Location: ../index.html');
    exit();
?>