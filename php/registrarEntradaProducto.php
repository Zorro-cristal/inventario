<?php
    include './funcionesbdd.php';
    $id_product= $_POST['lista_producto'];
    $nombre_product= $_POST['producto'];
    $id_prov= $_POST['lista_proveedor'];
    $iva= $_POST['iva'];
    $alias= $_POST['alias'];
    echo "lista_prodcto= " . $id_product;
    echo "</br>";
    $stock_actual= (int)$_POST['stock'];
    echo "stock_actual= " . $stock_actual;
    echo "</br>";
    $stock= (int)$_POST['sumar'];
    echo "stock= " . $stock;
    echo "</br>";
    $precio= $_POST['precio'];
    $precio_compra= $_POST['precio_compr'];
    $fecha= $_POST['fecha'];
    $id_categ= $_POST['categoria'];
    
    if ($id_product == 0) {
        $comando= "INSERT INTO Productos (nombre_producto, cantidad_disponible,precio,impuesto,categoria_fk,proveedor_fk) VALUES ('" . $nombre_product . "', " . $stock . ", " . $precio . ", " . $iva . ", " . $id_categ . ", " . $id_prov . ");";
    } else {
        $stock= $stock_actual + $stock;
        $comando= "UPDATE Productos SET cantidad_disponible= " . $stock . ", nombre_producto= '".$nombre_product."',precio= ".$precio.", impuesto= ".$iva.", categoria_fk= ".$id_categ.", proveedor_fk= ".$id_prov." WHERE id=" . $id_product . ";";
    }
    echo $comando;
    modificarBdd($comando);
    echo $comando;
    header('Location: ../pages/listarInventario.html');
    exit();
?>