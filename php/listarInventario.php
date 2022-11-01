<?php
    include './funcionesbdd.php';
    $inventario= conectarBdd("SELECT * FROM productos");
    $aux= json_encode($inventario);
    echo ($aux);
?>