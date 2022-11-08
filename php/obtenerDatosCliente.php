<?php
    include './funcionesbdd.php';
    $cedula= $_POST['cedula'];
    $comando= 'SELECT * FROM clientes WHERE cedula= ' . $cedula . ';';
    $cliente= conectarBdd($comando);
    echo (json_encode($cliente));
?>