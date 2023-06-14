<?php
    include './funcionesbdd.php';
    //Obtenemos el id_vent
    $id_vent= $_POST['id'];
    //Eliminamos datos en ambas tablas
    $comando= "DELETE FROM Detalle_ventas WHEREVenta_fk= " . $id_vent . ";";
    modificarBdd($comando);
    $comando= "DELETE FROM Ventas WHERE id= " . $id_vent . ";";
    modificarBdd($comando);
?>