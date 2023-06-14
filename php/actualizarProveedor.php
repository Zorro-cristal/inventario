<?php
    include './funcionesbdd.php';
    $id= $_POST['id_proveedor'];
    $nombre= strtolower($_POST['nombre']);
    $telefono= $_POST['telefono'];
    if ($telefono == "" || $telefono == null) {
        $comando= 'UPDATE  Proveedores SET nombre= "' . $nombre . '" WHERE id= ' . $id . ';';
    } else {
        $comando= 'UPDATE  Proveedores SET nombre= "' . $nombre . '", telefono= ' . $telefono .' WHERE id= ' . $id . ';';
    }
    modificarBdd($comando);
    header('Location: ../index.html');
    exit();
?>