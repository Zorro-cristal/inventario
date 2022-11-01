<?php
    include './funcionesbdd.php';
    $clientes= conectarBdd("SELECT * FROM clientes WHERE (deuda > 0)");
    $aux= json_encode($clientes);
    echo ($aux);
?>