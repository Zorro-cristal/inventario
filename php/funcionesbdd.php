<?php
    $servername= "localhost";
    $user= "root";
    $contras= "";
    $dbname= "inventario";
    $puerto= 3306;
    function conectarBdd($sql) {
        GLOBAL $servername, $user, $contras, $dbname, $puerto;
        $datos= array();

        //Crear conexion
        $conn= mysqli_connect($servername, $user, $contras, $dbname, $puerto);

        //En caso de error en la conexion
        if (!$conn) {
            echo '<dialog open>Error al conectar con la base de datos</dialog>';
            die("Conexion fallida: " . mysqli_connect_error());
        }

        //Ejecutamos el comando y obtenemos el resultado si es que hay
        $result= mysqli_query($conn, $sql);
        while ($row = mysqli_fetch_assoc($result)) {
            $datos[]= $row;
        }

        //Cerramos la conexion
        mysqli_close($conn);

        return $datos;
    }

    function modificarBdd($sql) {
        GLOBAL $servername, $user, $contras, $dbname;
        //Crear conexion
        $conn= mysqli_connect($servername, $user, $contras, $dbname);

        //En caso de error en la conexion
        if (!$conn) {
            echo '<dialog open>Error al conectar con la base de datos</dialog>';
            die("Conexion fallida: " . mysqli_connect_error());
        }

        //Ejecutamos el comando y obtenemos el resultado si es que hay
        $result= mysqli_query($conn, $sql);
        if (!$result) {
            echo '<dialog open>Error al modificar la base de datos</dialog>';
            die("Error al modificar: " . $conn->error);
        }

        //Obtenemos la id autogenerado
        $id= mysqli_insert_id($conn);

        //Cerramos la conexion
        mysqli_close($conn);

        return $id;
    }

    //Funcion ue transforma el string de fecha js to fecha mysql
    function convertirFecha($fecha) {
        $dia= substr($fecha, 0, 1);
        $mes= substr($fecha, 3, 4);
        $anho= substr($fecha, 6);
        //return $anho . '-' . $mes . '-' . $dia;
        $fecha_formateada= conectarBdd('SELECT STR_TO_DATE("' . $fecha . '", "%Y-%m-%d");');
        foreach ($fecha_formateada[0] as $clave => $val) {
            return $val;
        }
    }
?>