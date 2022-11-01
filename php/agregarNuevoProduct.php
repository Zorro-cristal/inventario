<?php
    //Extraemos las variables necesarias
    $nombre= $_POST['nombre'];
    $descripcion= $_POST['descripcion'];
    $stock= 0;

    //Guardamos los datos en la base de datos
    $comando= 'INSERT INTO productos(nombre, descripcion, stock) VALUES (' . $nombre . ', ' . ', ' . $descripcion . ', ' . $stock . ')';
    modificarBdd($comando);

    //Redireccionamos la pagina nuevamente al de registrarVenta
    header('Location: ../pages/agregarProducto.html');
    //http_redirect($url, true, HTTP_REDIRECT_PERM);
    exit();
?>