<?php
    include './funcionesbdd.php';
    $id= $_POST['cedula'];
    $id= explode(".", $id);
    $id= implode($id);
    $nombre= strtolower($_POST['nombre']);
    $apellido= strtolower($_POST['apellido']);
    $telefono= $_POST['telefono'] ?? 0;
    $direccion= strtolower($_POST['direccion']) ?? "";
    $fech_nac= $_POST['fech_nac'] ?? "";
    $ruc= $_POST['ruc'] ?? 0;
    //Armamos el comando sql
    $comando= 'UPDATE Clientes SET nombre= "' . $nombre . '", apellido= "' . $apellido . '"';
    if ($telefono > 0) {
        $comando= $comando . ', telefono= ' . $telefono;
    }
    if ($ruc > 0) {
        $comando= $comando . ', ruc= ' . $ruc;
    }
    if ($direccion != null && $direccion != "") {
        $comando= $comando . ', direccion= "' . $direccion . '"';
    }
    if ($fech_nac != null && $fech_nac != "") {
        $fech_nac= convertirFecha($fech_nac);
        $comando= $comando . ', fech_nac= "' . $fech_nac . '"';
    }
    $comando= $comando . ' WHERE cedula= ' . $id;
    echo $comando;
    modificarBdd($comando);
    header('Location: ../index.html');
    exit();
?>