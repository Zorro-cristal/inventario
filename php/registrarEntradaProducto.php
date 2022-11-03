<?php
    include './funcionesbdd.php';
    $id_product= $_POST['lista_producto'];
    $stock_actual= (int)$_POST['stock'];
    $stock= (int)$_POST['sumar'];
    $precio= $_POST['precio'];
    $stock= $stock_actual + $stock;
    $comando= "UPDATE productos SET stock= " . $stock . ", precio_venta= " . $precio . " WHERE id=" . $id_product . ";";
    echo($comando);
    modificarBdd($comando);
    header('Location: ../index.html');
    exit();
?>