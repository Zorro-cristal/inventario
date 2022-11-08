<?php
    include './funcionesbdd.php';
    $id= $_POST['cedula'];
    $nombre= strtolower($_POST['nombre']);
    $apellido= strtolower($_POST['apellido']);
    $telefono= $_POST['telefono'];
    $direccion= strtolower($_POST['direccion']);
    $fech_nac= $_POST['fech_nac'];
    $fech_nac= convertirFecha($fech_nac);
    $ruc= $_POST['ruc'];
    //Armamos el comando sql
    $comando= 'UPDATE clientes SET nombre= "' . $nombre . '", apellido= "' . $apellido . '"';
    if ($telefono != null && $telefono != "") {
        $comando= $comando . ', telefono= ' . $telefono;
    }
    if ($ruc != null && $ruc != "") {
        $comando= $comando . ', ruc= ' . $ruc;
    }
    if ($direccion != null && $direccion != "") {
        $comando= $comando . ', direccion= "' . $direccion . '"';
    }
    if ($fech_nac != null && $fech_nac != "") {
        $comando= $comando . ', fech_nac= "' . $fech_nac . '"';
    }
    $comando= $comando . ' WHERE cedula= ' . $id;
    echo $comando;
    modificarBdd($comando);
    header('Location: ../index.html');
    exit();
?>