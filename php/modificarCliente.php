<?php
    include './funcionesbdd.php';
    $cedula= $_POST['cedula'];
    $nombre= $_POST['nombre'];
    $apellido= $_POST['apellido'];
    $ruc= $_POST['ruc'];
    $direccion= $_POST['direccion'];
    $fecha= $_POST['fecha'];
    $comando= "UPDATE INTO clientes SET nombre= " . $nombre ", apellido= " . $apellido . ", ruc= " . $ruc . ", direccion= " . $direccion . ", fecha_nacimiento= " . $fecha . " WHERE cedula= " . $cedula;
    modificarBdd($comando);
    header('Location: ../index.html');
?>