<?php
    include './funcionesbdd.php';
    $productos= conectarBdd("SELECT * FROM Productos");
    $proveedores= conectarBdd("SELECT * FROM Proveedores");
    $aux= array(1=>$productos, 2=>$proveedores);
    $aux= json_encode($aux);
    echo ($aux);
?>