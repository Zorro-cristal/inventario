<?php
    include './funcionesbdd.php';
    $alias= $_POST['usuario'];
    $comando= "SELECT R.nombre AS alias FROM roles AS R JOIN usuarios AS U ON U.rol_id = R.id WHERE U.alias = '" . $alias . "';";
    $datos= conectarBdd($comando);
    echo json_encode($datos);
?>