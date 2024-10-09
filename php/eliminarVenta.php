<?php
    include './funcionesbdd.php';
    //Obtenemos el id_vent
    $id_vent= $_POST['id'];
    //Eliminamos datos en ambas tablas
    $comando= "DELETE FROM Detalles_transacciones WHERE transaccion_fk= " . $id_vent . ";";
    modificarBdd($comando);
    $comando= "DELETE FROM Transacciones WHERE id_transacciones= " . $id_vent . ";";
    modificarBdd($comando);
?>