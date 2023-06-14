<?php
    include './funcionesbdd.php';
    // Obtenemos los datos del timbrado
    $cod= $_POST['timbrado'];
    $fech_auto= $_POST['fech_autoriz'];
    $fech_venc= $_POST['fech_venc'];
    $fech_auto= convertirFecha($fech_auto);
    $fech_venc= convertirFecha($fech_venc);
    // Eliminamos si existe un timbrado que vensa antes
    $sql= "DELETE FROM Timbrados WHERE fech_vencimiento > STR_TO_DATE('" . $fech_venc . "', '%Y-%m-%d');";
    modificarBdd($sql);
    // Guardamos el nuevo timbrado
    $sql= "INSERT INTO Timbrados (cod, fech_autorizacion, fech_vencimiento) VALUES ";
    $sql= $sql . "(" . $cod . ", STR_TO_DATE('" . $fech_auto . "', '%Y-%m-%d'), STR_TO_DATE('" . $fech_venc . "', '%Y-%m-%d'));";
    echo($sql);
    modificarBdd($sql);
    //Redireccionamos
    header('Location: ../index.html');
    exit();
?>