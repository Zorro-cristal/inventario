<?php
    include './funcionesbdd.php';
    $pago= $_POST['pago'];
    $deuda= $_POST['deuda'];
    $cedula= $_POST['cedula'];
    $comando= "UPDATE clientes SET deuda= " . $deuda - $pago . " WHERE cedula=" . $cedula;
    modificarBdd($comando);
?>