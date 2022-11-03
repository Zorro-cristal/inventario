<?php
    include './funcionesbdd.php';
    $id_product= $_POST['lista_producto'];
    $stock_actual= (int)$_POST['stock'];
    $stock= (int)$_POST['sumar'];
    $precio= $_POST['precio'];
    echo ("<script>alert(id_product: " . $id_product . ")</script>");
    $stock= $stock_actual + $stock;
    $comando= "UPDATE productos SET stock= " . $stock . ", precio= " . $precio . " WHERE id=" $id_product;
    modificarBdd($comando);
    header('Location: ../index.html');
    exit();
?>