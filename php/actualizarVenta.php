<?php
    include './funcionesbdd.php';

    $id= $_POST['id'];
    $nro_factura= $_POST['nro_factura'];

    $comando= "UPDATE Transacciones SET num_factura= '" . $nro_factura . "' WHERE id_transacciones= " . $id;
    modificarBdd($comando);
    exit();
?>