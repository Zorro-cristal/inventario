<?php
    include './funcionesbdd.php';
    $nombre= $_POST['nombre'];
    $telefono= $_POST['telefono'];
    $comando= "UPDATE INTO proveedor SET telefono= " . $telefono " WHERE nombre= " . $nombre;
    modificarBdd($comando);
    header('Location: ../index.html');
?>