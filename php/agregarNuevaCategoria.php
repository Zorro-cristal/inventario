<?php
    include './funcionesbdd.php';
    //Extraemos las variables necesarias
    $nombre= strtolower($_POST['nombre_cat']);
    $id= $_POST['id_cat'];
    $comando= "";
    //Generamos el comando de acuerdo a la situacion
    if ($id == 0) {
        $comando= 'INSERT INTO Categorias(nombre_categoria) VALUES ("' . $nombre . '")';
    } else {
        $comando= 'UPDATE Categorias nombre_categoria= "' . $nombre . '" WHERE id_categoria='.$id.';';
    }
    echo $comando;

    //Guardamos los datos en la base de datos
    modificarBdd($comando);

    //Redireccionamos la pagina nuevamente al de registrarVenta
    header('Location: ../pages/agregarProducto.html');
    //http_redirect($url, true, HTTP_REDIRECT_PERM);
    exit();
?>