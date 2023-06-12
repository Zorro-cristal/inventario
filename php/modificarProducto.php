<?php
    include './funcionesbdd.php';
    $id= $_POST['id'];
    $nombre= strtolower($_POST['nombre']);
    $descripcion= $_POST['descripcion'] ?? "";
    $precio= $_POST['precio'] ?? 0;
    $comando= "UPDATE INTO Productos SET nombre= '" . $nombre . "', descripcion= '" . $descripcion . "'";
    if ($precio > 0) {
        $comando= $comando . ", precio_venta= " . $precio;
    }
    $comando= $comando . "WHERE id=" . $id;
    modificarBdd($comando);
    header('Location: ../pages/listarInventario.html');
?>