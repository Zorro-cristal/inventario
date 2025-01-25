<?php
    include './funcionesbdd.php';
    //Extraemos las variables necesarias
    $nombre= strtolower($_POST['nombre_prov']);
    $telefono= $_POST['telefono'];
    $direccion= $_POST['direccion'];

    //Generamos el comando de acuerdo a los datos recibidos
    $comando= 'INSERT INTO  Proveedores(nombre_proveedor, telefono_proveedor,direccion_proveedor) VALUES ("' . $nombre . '", "' . $telefono . '", "' . $direccion . '")';

    //Guardamos los datos en la base de datos
    modificarBdd($comando);

    //Redireccionamos y finalizamos
    header('Location: ../pages/agregarProducto.html');
    exit();
?>