<?php
    include './funcionesbdd.php';
    $usuario= $_POST['usuario'];
    $contra= $_POST['contra'];
    //Buscamos si existe una clave como la introducida
    $comando= "select alias from usuarios where contra= aes_encrypt('" . $contra . "', 'inventario');";
    echo "</br>";
    echo $comando;
    $contra= conectarBdd($comando);
    echo "</br>";
    echo "usuario:";
    echo json_decode($usuario);
    if ($contra) {
        //Si el usuario existe, comparamos el usuario introducido
        echo "</br>";
        echo $comando;
        $contra= conectarBdd($comando);
        echo "</br>";
        echo "contra:";
        echo json_encode($contra);
        //Comprobamos si la contraseña obtenida coincide con la codificada
        if ($contra[0]['alias'] == $usuario){
            echo ("Datos validos");
            header("Location: ../index_sec.html");
            exit();
        }
    }
    //En caso de que el usuario no exista o la contraseña sea erronea, redirigimos al login
    echo "Datos de usuario incorrectos";
    header("Location: ../index2.html");
    exit();
?>