<?php
    include './funcionesbdd.php';
    $nombre= strtolower($_POST['nombre']);
    $telefono= $_POST['telefono'];
    $comando= "UPDATE INTO Proveedor SET telefono= " . $telefono . " WHERE nombre= " . $nombre;
    modificarBdd($comando);
    header('Location: ../index.html');
?>