<?php
    include './funcionesbdd.php';

    // Configurar encabezados para la descarga de CSV
header('Content-Type: text/csv');
header('Content-Disposition: attachment;filename="output.csv"');
header('Cache-Control: no-cache, no-store, must-revalidate'); // Evitar el almacenamiento en caché
header('Pragma: no-cache');
header('Expires: 0');

    // Obtener datos para sintaxis sql
    $tabla = $_POST['tabla'];
    $campos= "*";
    if (isset($_POST['campos'])) {
        $campos = $_POST['campos'];
    }
    $condicion= "";
    if (isset($_POST['filtros'])) {
        $condicion = $_POST['filtros'];
    }
    $sql= 'SELECT ' . $campos . ' FROM ' . $tabla;
    if ($condicion != "") {
        $sql= $sql . ' WHERE (' . $condicion . ')';
    }

    // Obtenemos los datos
    $datos= conectarBdd($sql);

    // Generamos el csv
    $csv = fopen('php://output', 'w+');
    $campos= str_replace(",", ";", $campos);
    fputs($csv, $campos."\n");

    foreach ($datos as $key => $value) {
        fputcsv($csv, $value, ';');
    }

    fclose($csv);
    exit();
?>