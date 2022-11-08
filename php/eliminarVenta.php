<?php
    include './funcionesbdd.php';
    //Obtenemos el id_vent
    $id_vent= $_POST['id'];
    //Eliminamos datos en ambas tablas
    $comando= "DELETE FROM detalle_ventas WHERE venta_fk= " . $id_vent . ";";
    modificarBdd($comando);
    $comando= "DELETE FROM ventas WHERE id= " . $id_vent . ";";
    modificarBdd($comando);
?>