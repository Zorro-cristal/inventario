<?php
    include './funcionesbdd.php';
    $sql= $_POST['comando'];
    try {
        $datos= conectarBdd($sql);
        echo (json_encode($datos));
    } catch (Exception $error) {
        echo ("<script>alert('Error al agregar el nuevo cliente: " . $error->getMessage() . ");</script>");
        echo ("<script>console.log(" . $error . ")</script>");
        throw $error;
    }
?>