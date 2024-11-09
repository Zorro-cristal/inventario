<?php
    include './funcionesbdd.php';
    $ventas= conectarBdd("SELECT * FROM Transacciones");
    $detalle_ventas= conectarBdd("SELECT * FROM Detalle_transacciones");
    $cliente= conectarBdd("SELECT * FROM Clientes");
    $producto= conectarBdd("SELECT * FROM Productos");
    $aux= array(1=>$ventas, 2=>$detalle_ventas, 3=>$cliente, 4=>$producto);
    $aux= json_encode($aux);
    echo ($aux);
?>