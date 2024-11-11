<?php
    //$display_errors = ini_get('display_errors');
    //ini_set('display_errors', 0);
    include './funcionesbdd.php';
    require('./fpdf.php');
    //Definicion de variables
    class PDF extends FPDF {
        const ALTURA= 5;
        function Cabecero() {
            $this->Cell(8,self::ALTURA,'Cant',1);
            $this->Cell(38,self::ALTURA,'Producto',1);
            $this->Cell(11,self::ALTURA,'Desc',1);
            $this->Cell(8,self::ALTURA,'Iva',1);
            $this->Cell(22,self::ALTURA,'Sub',1);
            $this->Ln();
        }
        function Cuerpo($cant, $producto, $descuento, $iva, $subtotal) {
            $this->Cell(8,self::ALTURA,$cant,1);
            $this->Cell(38,self::ALTURA,$producto,1);
            $this->Cell(11,self::ALTURA,$descuento,1);
            $this->Cell(8,self::ALTURA,$iva,1);
            $this->Cell(22,self::ALTURA,$subtotal,1);
            $this->Ln();
        }
    }
    $empr_nombre= utf8_decode("Libreria");
    $empr_ruc= "4360067-0";
    $empr_dir= "Villarrica - Paraguay";
    //Agregamos la nuevaVenta
    $fecha= $_POST['fecha'];
    $cedula= $_POST['cedula'];
    $num_factura= $_POST['num_factura'];
    //Generamos el numero de factura
    $comando= 'INSERT INTO Transacciones(cliente_fk, fecha, num_factura, tipo_fk) VALUES (' . $cedula . ',"' . $fecha . '", '.$num_factura.', 1)';
    //echo "<br/>Insertando en la tablaVentas<br/>";
    //echo ($comando);
    $idVenta= modificarBdd($comando);
    //Agregamos los Productos asociados a laVenta
    $canasta= $_POST['canasta'];
    $canasta= json_decode($canasta, true);
    $total= 0;
    if (count($canasta) < 1) {
        $informacion =array("1" => "error","2" => "Ningun producto cargado");
        echo json_encode($informacion);	
        exit();
    }
    //echo json_encode($canasta);
    for ($i= 0; $i < count($canasta); ++$i) {
        $comando= "INSERT INTO detalles_transacciones(producto_fk,transaccion_fk, cantidad, descuento, precio_venta) VALUES (";
        // echo "<br/>Insertando en la tablaDetalle_ventas<br/>";
        
        if ($canasta[$i]['descuento'] == "" || isset($canasta[$i]['descuento'])){
            $comando= $comando . $canasta[$i]['id'] . ", " . $idVenta . ", " . $canasta[$i]['cantidad'] . ", 0, " . $canasta[$i]['precio'] . ")";
            //Se genera el monto total para casos de deudas
            $monto= floatval($canasta[$i]['precio']) * intval($canasta[$i]['cantidad']);
        } else {
            $comando= $comando . $canasta[$i]['id'] . ", " . $idVenta . ", " . $canasta[$i]['cantidad'] . ", " . $canasta[$i]['descuento'] . ", " . $canasta[$i]['precio'] . ")";
            //Se genera el monto total para casos de deudas
            $monto= (floatval($canasta[$i]['precio']) - floatval($canasta[$i]['descuento'])) * intval($canasta[$i]['cantidad']);
        }
        modificarBdd($comando);
        $total= $total + floatval($monto);
        //Se resta el producto del stock actual
        $comando= 'SELECT cantidad_disponible as stock FROM productos WHERE id_producto=' . $canasta[$i]['id'];
        $stock= conectarBdd($comando);
        $stock= (int)$stock[0]['stock'];
        if ($stock < $canasta[$i]['cantidad']) {
            $comando= 'UPDATE Productos SET cantidad_disponible= 0 WHERE id_producto= ' . $canasta[$i]['id'] . ';';
        } else{
            $stock= $stock - (int)$canasta[$i]['cantidad'];
            $comando= 'UPDATE Productos SET cantidad_disponible= ' . $stock . ' WHERE id_producto= ' . $canasta[$i]['id'] . ';';
        }
        //echo "<br/>Se actualiza el stock<br/>";
        //echo $comando;
        modificarBdd($comando);
    }
    //Se genera deuda
    $deuda= $_POST['deuda'];
    if (!empty($deuda) || $deuda != 0) {
        $comando= 'UPDATE Clientes SET deuda= ' . $total . ' WHERE cedula=' . $cedula;
        //echo "<br/>Se genera dueda? " . $deuda . "<br/>";
        //echo $comando;
        modificarBdd($comando);
        $forma_pago= "Credito";
    } else {
        //echo "<br/>No se genera deuda<br/>";
        $forma_pago= "Contado";
    }
    
    //Obtenemos los datos del vendedor
    /*$comando= "SELECT establecimiento, punto_expedicion, nro_venta FROM Usuarios WHERE alias= '" . $alias . "';";
    $factura= conectarBdd($comando)[0];*/
    
    $comando= "SELECT * FROM Transacciones WHERE id_transacciones= ". $idVenta;
    $venta= conectarBdd($comando)[0];
    //echo json_encode($venta) . "<br/>";
    $nro_venta= intval($venta['num_factura']) + 1;
    
    //generamos el numero de factura y actualizamos los datos de laVenta
    //$nro_factura= sprintf("%'.03d", intval($factura['establecimiento'])) . "-" . sprintf("%'.03d", intval($factura['punto_expedicion'])) . "-" . sprintf("%'.07d", $num_factura);
    $nro_factura= sprintf("%'.07d", $num_factura);

    $comando= "UPDATE Transacciones SET num_factura= '" . $nro_factura . "' WHERE id_transacciones = " . $idVenta;
    modificarBdd($comando);

    $comando= "SELECT * FROM Clientes WHERE cedula= ". $cedula;
    $cliente= conectarBdd($comando)[0];

    $comando= "SELECT p.nombre_producto, p.impuesto, dv.cantidad, dv.descuento, dv.precio_venta FROM detalles_transacciones dv JOIN Productos p ON p.id_producto=dv.producto_fk WHERE transaccion_fk= " . $idVenta;
    $detalle_ventas= conectarBdd($comando);
    
    /*$comando= "SELECT cod FROM Timbrados WHERE ((fech_autorizacion < '" . $fecha . "') AND (fech_vencimiento > '" . $fecha . "'));";
    $emp_timbrado= conectarBdd($comando)[0];
    $emp_timbrado= $emp_timbrado['cod'];
    //echo $emp_timbrado . "<br/>";*/
    
    //Generamos el pdf
    $fech= explode("-", $fecha);
    $fecha= $fech[2] . "/" . $fech[1] . "/" . $fech[0];
    $client_ruc= $cliente['cedula'];
    if ($cliente['ruc'] != null) {
        $client_ruc= $client_ruc . '-' . $cliente['ruc'];
    }

    $informacion =array("1" => "exito","2" => $idVenta);
    echo json_encode($informacion);	
    exit();
?>