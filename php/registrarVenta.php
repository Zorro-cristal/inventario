<?php
    include './funcionesbdd.php';
    $productos= conectarBdd("SELECT * FROM Productos");
    $clientes= conectarBdd("SELECT * FROM Clientes");
    $aux= array(1=>$productos, 2=>$clientes);
    $aux= json_encode($aux);
    echo ($aux);
?>