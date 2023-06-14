<?php
    include './funcionesbdd.php';
    $pago= $_POST['pago'];
    $deuda= $_POST['deuda'];
    $cedula= $_POST['cedula'];
    $comando= "UPDATE Clientes SET deuda= " . $deuda - $pago . " WHERE cedula=" . $cedula;
    modificarBdd($comando);
    header('Location: ../pages/listarDeudas.html');
?>