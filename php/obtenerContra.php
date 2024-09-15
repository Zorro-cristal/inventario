<?php
    include './funcionesbdd.php';
    $usuario= $_POST['usuario'];
    $contra= $_POST['contra'];
    //Buscamos si existe una clave como la introducida
    $comando= "select alias from Usuarios where contra= aes_encrypt('" . $contra . "', 'inventario');";
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
            //Guardamos el usuario en el cache
            echo ('<script type="text/JavaScript">localStorage.setItem("usuario", "' . $usuario . '");</script>');
            echo ('<script type="text/JavaScript">const dato= "' . $usuario . '";</script>');
            //Guarda en la cookie que vencera en una hora
            header("Location: ../index.html?usuario=" . urlencode($usuario));
            exit();
        }
    }
    //En caso de que el usuario no exista o la contraseña sea erronea, redirigimos al login
    echo "Datos de usuario incorrectos";
    header("Location: ../login2.html");
    exit();
?>