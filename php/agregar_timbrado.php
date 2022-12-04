<?php
    include './funcionesbdd.php';
    // Obtenemos los datos del timbrado
    $cod= $_POST['timbrado'];
    $fech_auto= $_POST['fech_autoriz'];
    $fech_venc= $_POST['fech_venc'];
    $fech_auto= convertirFecha($fech_auto);
    $fech_venc= convertirFecha($fech_venc);
    // Eliminamos si existe un timbrado que vensa antes
    $sql= "DELETE FROM timbrados WHERE fech_vencimiento > " . $fech_venc;
    modificarBdd($sql);
    // Guardamos el nuevo timbrado
    $sql= "INSERT INTO timbrados (cod, fech_autorizacion, fech_vencimiento) VALUES ";
    $sql= $sql . "(" . $cod . ", '" . $fech_auto . "', '" . $fech_venc . "');";
    echo($sql);
    modificarBdd($sql);
    //Redireccionamos
    header('Location: ../index.html');
    exit();
?>