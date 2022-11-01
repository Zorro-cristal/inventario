<?php
    include './funcionesbdd.php';
    //Extraemos las variables necesarias
    $nombre= $_POST['nombre'];
    $telefono= $_POST['telefono'];

    //Guardamos los datos en la base de datos
    $comando= 'INSERT INTO Proveedores(nombre, telefono) VALUES (' . $nombre . ', ' . $telefono . ')';
    modificarBdd($comando);

    //Redireccionamos y finalizamos
    header('Location: ../pages/agregarProducto.html');
    exit();
?>