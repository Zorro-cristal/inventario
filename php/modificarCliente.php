<?php
    include './funcionesbdd.php';
    $cedula= $_POST['cedula'];
    $nombre= strtolower($_POST['nombre']);
    $apellido= strtolower($_POST['apellido']);
    $ruc= $_POST['ruc'];
    $direccion= strtolower($_POST['direccion']);
    $fecha= $_POST['fecha'];
    $fecha= convertirFecha($fecha);
    $comando= 'UPDATE INTO Clientes SET nombre= "' . $nombre . '", apellido= "' . $apellido . '", ruc= ' . $ruc . ', direccion= "' . $direccion . '", fecha_nacimiento= STR_TO_DATE("' . $fecha . '", "%Y-%m-%d") WHERE cedula= ' . $cedula;
    modificarBdd($comando);
    header('Location: ../index.html');
?>