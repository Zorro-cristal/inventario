<?php
    include './funcionesbdd.php';
    $nombre= $_POST['nombre'];
    $nombre= strtolower($nombre);
    $comando= 'SELECT * FROM proveedores WHERE nombre= "' . $nombre . '";';
    $proveedor= conectarBdd($comando);
    echo (json_encode($proveedor));
?>