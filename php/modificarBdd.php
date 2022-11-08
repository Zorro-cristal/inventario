<?php
    include './funcionesbdd.php';
    $sql= $_POST['comando'];
    try {
        modificarBdd($sql);
    } catch (Exception $error) {
        echo ("<script>alert('Error al agregar el nuevo cliente: " . $error->getMessage() . ");</script>");
        echo ("<script>console.log(" . $error . ")</script>");
        throw $error;
    }
?>