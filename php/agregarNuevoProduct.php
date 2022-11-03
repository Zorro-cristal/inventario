<?php
    include './funcionesbdd.php';
    //Extraemos las variables necesarias
    $nombre= $_POST['nombre_prod'];
    $descripcion= $_POST['descripcion'];
    $stock= 0;

    //Generamos el comando de acuerdo a la situacion
    if ($descripcion == "" || $descripcion == null) {
        $comando= 'INSERT INTO productos(nombre, stock) VALUES ("' . $nombre . '", ' . $stock . ')';
    } else {
        $comando= 'INSERT INTO productos(nombre, descripcion, stock) VALUES ("' . $nombre . '", ' . ', "' . $descripcion . '", ' . $stock . ')';
    }

    //Guardamos los datos en la base de datos
    modificarBdd($comando);

    //Redireccionamos la pagina nuevamente al de registrarVenta
    header('Location: ../pages/agregarProducto.html');
    //http_redirect($url, true, HTTP_REDIRECT_PERM);
    exit();
?>