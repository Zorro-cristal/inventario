<?php
    include './funcionesbdd.php';
    $sql= $_POST['comando'];
    $datos= conectarBdd($sql);
    $aux= json_encode($datos);
    if ($aux === false) {
        // Manejo de error en json_encode
        $aux= array("error", "Error al codificar a JSON: " . json_last_error_msg());
    }
    echo ($aux);
?>