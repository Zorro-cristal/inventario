<?php
    include './funcionesbdd.php';
    $ventas= conectarBdd("SELECT * FROM ventas");
    $detalle_ventas= conectarBdd("SELECT * FROM detalle_ventas");
    $cliente= conectarBdd("SELECT * FROM clientes");
    $producto= conectarBdd("SELECT * FROM productos");
    $aux= array(1=>$ventas, 2=>$detalle_ventas, 3=>$cliente, 4=>$producto);
    $aux= json_encode($aux);
    echo ($aux);
?>