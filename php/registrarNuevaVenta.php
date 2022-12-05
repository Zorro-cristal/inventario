<?php
    $display_errors = ini_get('display_errors');
    ini_set('display_errors', 0);
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
    $empr_nombre= utf8_decode("Gua'iteño House");
    $empr_ruc= "4360067-0";
    $empr_dir= "Villarrica - Paraguay";
    //Agregamos la nueva venta
    $fecha= $_POST['fecha'];
    $cedula= $_POST['cedula'];
    //Generamos el numero de factura
    $comando= 'INSERT INTO ventas(cliente_fk, fecha) VALUES (' . $cedula . ', STR_TO_DATE("' . $fecha . '", "%Y-%m-%d"))';
    //echo "</br>Insertando en la tabla ventas</br>";
    //echo ($comando);
    $idVenta= modificarBdd($comando);
    //Agregamos los productos asociados a la venta
    $canasta= $_POST['canasta'];
    $canasta= json_decode($canasta, true);
    $total= 0;
    ////echo json_encode($canasta);
    for ($i= 0; $i < count($canasta); ++$i) {
        $comando= "INSERT INTO detalle_ventas(producto_fk, venta_fk, cantidad, descuento, precio_venta) VALUES (";
        //echo "</br>Insertando en la tabla detalle_ventas</br>";
        //echo $comando;
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
        $comando= 'SELECT stock FROM productos WHERE id=' . $canasta[$i]['id'];
        $stock= conectarBdd($comando);
        $stock= (int)$stock[0]['stock'];
        if ($stock < $canasta[$i]['cantidad']) {
            $comando= 'UPDATE productos SET stock= 0 WHERE id= ' . $canasta[$i]['id'] . ';';
        } else{
            $stock= $stock - (int)$canasta[$i]['cantidad'];
            $comando= 'UPDATE productos SET stock= ' . $stock . ' WHERE id= ' . $canasta[$i]['id'] . ';';
        }
        //echo "</br>Se actualiza el stock</br>";
        //echo $comando;
        modificarBdd($comando);
    }
    //Se genera deuda
    $deuda= $_POST['deuda'];
    if (!empty($deuda)) {
        $comando= 'UPDATE clientes SET deuda= ' . $total . ' WHERE cedula=' . $cedula;
        //echo "</br>Se genera dueda? " . $deuda . "</br>";
        //echo $comando;
        modificarBdd($comando);
        $forma_pago= "Credito";
    } else {
        //echo "</br>No se genera deuda</br>";
        $forma_pago= "Contado";
    }
    //Obtenemos los datos del cliente
    $comando= "SELECT establecimiento, punto_expedicion FROM usuarios WHERE alias= '" . $factura . "';";
    //echo "</br>" . $comando . "</br>";
    $factura= conectarBdd($comando)[0];
    //echo json_encode($factura) . "</br>";
    $comando= "SELECT * FROM ventas WHERE id= ". $idVenta;
    $venta= conectarBdd($comando)[0];
    //echo json_encode($venta) . "</br>";
    //generamos el numero de factura y actualizamos los datos de la venta
    $nro_factura= intval($factura['establecimiento'])) . "-" . sprintf("%'.03d", intval($factura['punto_expedicion'])) . "." . sprintf("%'.09d", intval($venta['nro_venta']));
    $comando= "UPDATE ventas SET numero_factura= '" . $nro_factura . "' WHERE id = " . $idVenta;
    //echo "</br>Mostramos los datos</br>";
    $comando= "SELECT * FROM clientes WHERE cedula= ". $cedula;
    $cliente= conectarBdd($comando)[0];
    //echo json_encode($cliente) . "</br>";
    $comando= "SELECT p.nombre, p.iva, dv.cantidad, dv.descuento, dv.precio_venta FROM detalle_ventas dv JOIN productos p ON p.id=dv.producto_fk WHERE venta_fk= " . $idVenta;
    $detalle_ventas= conectarBdd($comando);
    //echo json_encode($detalle_ventas) . "</br>";
    $factura= $_POST['usuario'];
    $comando= "SELECT cod FROM timbrados WHERE ((fech_autorizacion < '" . $fecha . "') AND (fech_vencimiento > '" . $fecha . "'));";
    $emp_timbrado= conectarBdd($comando)[0];
    $emp_timbrado= $emp_timbrado['cod'];
    //echo $emp_timbrado . "</br>";
    
    //Generamos el pdf
    $fech= explode("-", $fecha);
    $fecha= $fech[2] . "/" . $fech[1] . "/" . $fech[0];
    $client_ruc= $cliente['cedula'];
    if ($cliente['ruc'] != null) {
        $client_ruc= $client_ruc . '-' . $cliente['ruc'];
    }
    $pdf= new PDF('P', 'mm', 'Letter');
    $espaciado= 93;
    $longitud= 87;
    $altura= 4;
    //Creacion del PDF
    $pdf-> AliasNbPages();
    $pdf -> AddPage();
    $pdf -> SetFont('Arial', 'B', 12);
    $pdf -> Cell($longitud, $altura, "Factura virtual", 0, 1, 'C');
    $pdf -> SetFont('Arial', 'B', 8);
    //Datos de la factura
    $pdf -> Image('../assets/logo_oficial.png', 15, 13, 20, 20);
    $empresa= utf8_decode("Gua'iteño House");
    $pdf -> Cell($longitud, $altura, $empr_nombre, 0, 1, 'R');
    $pdf -> Cell($longitud, $altura, $empr_ruc, 0, 1, 'R');
    $pdf -> Cell($longitud, $altura, $empr_dir, 0, 1, 'R');
    $pdf -> Cell($longitud, $altura, "Timbrado Nro.: " . sprintf("%'.08d", $emp_timbrado), 0, 1, 'R');
    $pdf -> Cell($longitud, $altura, sprintf("%'.03d", $nro_factura, 0, 1, 'R');
    //Datos del cliente
    $pdf -> Cell($longitud, $altura, "Fecha de la compra: ". $fecha, 0, 1);
    $pdf -> Cell($longitud, $altura, "Nombre del cliente: " . ucwords($cliente['nombre'] . ' ' . $cliente['apellido']), 0, 1);
    $pdf -> Cell($longitud/2, $altura, "Ruc: " . $client_ruc, 0);
    $pdf -> Cell($longitud/2, $altura, 'Forma de pago: ' . $forma_pago, 0, 1);
    $pdf -> Cell($longitud, $altura, "Direccion: " . ucwords($cliente['direccion']), 0, 1);
    //Tabla de prductos y calculos
    $grav_exent= 0;
    $grav_5= 0;
    $grav_10= 0;
    $pdf-> Cabecero();
    foreach ($detalle_ventas as $dv) {
        $pdf-> Cuerpo($dv['cantidad'], ucwords($dv['nombre']), $dv['descuento'], $dv['iva'], $dv['precio_venta']);
        switch ($dv['iva']) {
            case '10%':
                $grav_10= $grav_10 + ((floatval($dv['precio_venta']) - floatval($dv['descuento'])) * intval($dv['cantidad']));
                break;
            case '5%':
                $grav_5= $grav_5 + ((floatval($dv['precio_venta']) - floatval($dv['descuento'])) * intval($dv['cantidad']));
                break;
            default:
                $grav_exent= $grav_exent + ((floatval($dv['precio_venta']) - floatval($dv['descuento'])) * intval($dv['cantidad']));
                break;
        }
    }
    //Muestra el monto total y las gravadas
    $pdf -> Cell($longitud/2, $altura, "Total grav. 10%: ", 0);
    $pdf -> Cell($longitud/2, $altura, number_format($grav_10, 2), 0, 1, 'R');
    $pdf -> Cell($longitud/2, $altura, "Total grav. 5%: ", 0);
    $pdf -> Cell($longitud/2, $altura, number_format($grav_5, 2), 0, 1, 'R');
    $pdf -> Cell($longitud/2, $altura, "Total Exenta: ", 0);
    $pdf -> Cell($longitud/2, $altura, number_format($grav_exent, 2), 0, 1, 'R');
    $pdf -> Cell($longitud, $altura, "Monto total", 0, 1, 'C');
    $pdf -> SetFont('Arial', 'B', 14);
    $pdf -> Cell($longitud, 5, number_format($grav_5 + $grav_10 + $grav_exent, 2) . " gs.", 0, 1, 'C');
    $pdf -> SetFont('Arial', 'B', 8);
    //Resumen de informacion
    $pdf -> Cell($longitud/2, $altura, "IVA. 10%: ", 0);
    $pdf -> Cell($longitud/2, $altura, number_format($grav_10 * 0.1, 2), 0, 1, 'R');
    $pdf -> Cell($longitud/2, $altura, "IVA. 5%: ", 0);
    $pdf -> Cell($longitud/2, $altura, number_format($grav_5 * 0.05, 2), 0, 1, 'R');
    $pdf -> Cell($longitud/2, $altura, "Exenta: ", 0);
    $pdf -> Cell($longitud/2, $altura, number_format($grav_exent, 2), 0, 1, 'R');

    //Repetimos todo del otro lado
    $pdf -> SetY(10);
    $pdf -> SetFont('Arial', 'B', 12);
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud, $altura, "Factura virtual", 0, 1, 'C');
    $pdf -> SetFont('Arial', 'B', 8);
    //Datos de la factura
    $pdf -> Image('../assets/logo_oficial.png', $espaciado + 15, 13, 20, 20);
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud, $altura, $empr_nombre, 0, 1, 'R');
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud, $altura, $empr_ruc, 0, 1, 'R');
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud, $altura, $empr_dir, 0, 1, 'R');
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud, $altura, "Timbrado Nro.: " . sprintf("%'.08d", $emp_timbrado), 0, 1, 'R');
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud, $altura, sprintf("%'.03d", intval($factura['establecimiento'])) . "-" . sprintf("%'.03d", intval($factura['punto_expedicion'])) . "." . sprintf("%'.09d", intval($venta['nro_venta'])), 0, 1, 'R');
    //Datos del cliente
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud, $altura, "Fecha de la compra: ". $fecha, 0, 1);
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud, $altura, "Nombre del cliente: " . ucwords($cliente['nombre'] . ' ' . $cliente['apellido']), 0, 1);
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud/2, $altura, "Ruc: " . $client_ruc, 0);
    $pdf -> Cell($longitud/2, $altura, 'Forma de pago: ' . $forma_pago, 0, 1);
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud, $altura, "Direccion: " . ucwords($cliente['direccion']), 0, 1);
    //Tabla de prductos y calculos
    $grav_exent= 0;
    $grav_5= 0;
    $grav_10= 0;
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf-> Cabecero();
    foreach ($detalle_ventas as $dv) {
        $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
        $pdf-> Cuerpo($dv['cantidad'], ucwords($dv['nombre']), $dv['descuento'], $dv['iva'], $dv['precio_venta']);
        switch ($dv['iva']) {
            case '10%':
                $grav_10= $grav_10 + ((floatval($dv['precio_venta']) - floatval($dv['descuento'])) * intval($dv['cantidad']));
                break;
            case '5%':
                $grav_5= $grav_5 + ((floatval($dv['precio_venta']) - floatval($dv['descuento'])) * intval($dv['cantidad']));
                break;
            default:
                $grav_exent= $grav_exent + ((floatval($dv['precio_venta']) - floatval($dv['descuento'])) * intval($dv['cantidad']));
                break;
        }
    }
    //Muestra el monto total y las gravadas
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud/2, $altura, "Total grav. 10%: ", 0);
    $pdf -> Cell($longitud/2, $altura, number_format($grav_10, 2), 0, 1, 'R');
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud/2, $altura, "Total grav. 5%: ", 0);
    $pdf -> Cell($longitud/2, $altura, number_format($grav_5, 2), 0, 1, 'R');
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud/2, $altura, "Total Exenta: ", 0);
    $pdf -> Cell($longitud/2, $altura, number_format($grav_exent, 2), 0, 1, 'R');
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud, $altura, "Monto total", 0, 1, 'C');
    $pdf -> SetFont('Arial', 'B', 14);
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud, 5, number_format($grav_5 + $grav_10 + $grav_exent, 2) . " gs.", 0, 1, 'C');
    $pdf -> SetFont('Arial', 'B', 8);
    //Resumen de informacion
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud/2, $altura, "IVA. 10%: ", 0);
    $pdf -> Cell($longitud/2, $altura, number_format($grav_10 * 0.1, 2), 0, 1, 'R');
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud/2, $altura, "IVA. 5%: ", 0);
    $pdf -> Cell($longitud/2, $altura, number_format($grav_5 * 0.05, 2), 0, 1, 'R');
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud/2, $altura, "Exenta: ", 0);
    $pdf -> Cell($longitud/2, $altura, number_format($grav_exent, 2), 0, 1, 'R');

    //Escribimos la linea final
    $pdf -> SetX(5);
    $pdf -> Cell($longitud, $altura, str_repeat('-', $longitud*2+30));
    //Muestra el archivo generado
    $pdf -> Output('factura', "I");
?>