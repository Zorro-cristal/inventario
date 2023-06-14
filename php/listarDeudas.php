<?php
    include './funcionesbdd.php';
    $Clientes= conectarBdd("SELECT * FROM Clientes WHERE (deuda > 0)");
    $aux= json_encode($Clientes);
    echo ($aux);
?>