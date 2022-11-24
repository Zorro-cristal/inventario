<?php
    include './funcionesbdd.php';
    $sql= $_POST['comando'];
    $datos= conectarBdd($sql);
    $aux= json_encode($datos);
    echo ($aux);
?>