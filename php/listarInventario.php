<?php
    include './funcionesbdd.php';
    $inventario= conectarBdd("SELECT * FROM productos WHERE stock>0");
    $aux= json_encode($inventario);
    echo ($aux);
?>