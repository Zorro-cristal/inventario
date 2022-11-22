<?php
    include './funcionesbdd.php';
    //Extraemos las variables necesarias
    $nombre= strtolower($_POST['nombre_prov']);
    $telefono= $_POST['telefono'];

    //Generamos el comando de acuerdo a los datos recibidos
    if ($telefono == "" || $telefono == null) {
        $comando= 'INSERT INTO proveedores(nombre) VALUES ("' . $nombre . '")';
    } else {
        $comando= 'INSERT INTO proveedores(nombre, telefono) VALUES ("' . $nombre . '", "' . $telefono . '")';
    }

    //Guardamos los datos en la base de datos
    modificarBdd($comando);

    //Redireccionamos y finalizamos
    header('Location: ../pages/agregarProducto.html');
    exit();
?>