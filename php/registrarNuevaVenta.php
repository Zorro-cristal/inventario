<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Factura digital</title>
        <script type="text/javascript" src="../js_scripts/jquery.js"></script>
        <!-- CSS only -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
    </head>
    <body>
        <header class="d-flex justify-content-end py-3">
            <button class="btn btn-outline-primary me-2" onclick='location.href= "../index.html";' >Volver al menu</button>
        </header>
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
            //Obtenemos el alias
            $alias= $_POST['alias'];
            //Agregamos la nuevaVenta
            $fecha= $_POST['fecha'];
            $cedula= $_POST['cedula'];
            //Generamos el numero de factura
            $comando= 'INSERT INTO Ventas(cliente_fk, responsable, fecha) VALUES (' . $cedula . ', ' . $alias . ', STR_TO_DATE("' . $fecha . '", "%Y-%m-%d"))';
            //echo "</br>Insertando en la tablaVentas</br>";
            //echo ($comando);
            $idVenta= modificarBdd($comando);
            //Agregamos los Productos asociados a laVenta
            $canasta= $_POST['canasta'];
            $canasta= json_decode($canasta, true);
            $total= 0;
            //echo json_encode($canasta);
            for ($i= 0; $i < count($canasta); ++$i) {
                $comando= "INSERT INTO Detalle_ventas(producto_fk,Venta_fk, cantidad, descuento, precio_venta) VALUES (";
                //echo "</br>Insertando en la tablaDetalle_ventas</br>";
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
                $comando= 'SELECT stock FROM Productos WHERE id=' . $canasta[$i]['id'];
                $stock= conectarBdd($comando);
                $stock= (int)$stock[0]['stock'];
                if ($stock < $canasta[$i]['cantidad']) {
                    $comando= 'UPDATE Productos SET stock= 0 WHERE id= ' . $canasta[$i]['id'] . ';';
                } else{
                    $stock= $stock - (int)$canasta[$i]['cantidad'];
                    $comando= 'UPDATE Productos SET stock= ' . $stock . ' WHERE id= ' . $canasta[$i]['id'] . ';';
                }
                //echo "</br>Se actualiza el stock</br>";
                //echo $comando;
                modificarBdd($comando);
            }
            //Se genera deuda
            $deuda= $_POST['deuda'];
            if (!empty($deuda)) {
                $comando= 'UPDATE Clientes SET deuda= ' . $total . ' WHERE cedula=' . $cedula;
                //echo "</br>Se genera dueda? " . $deuda . "</br>";
                //echo $comando;
                modificarBdd($comando);
                $forma_pago= "Credito";
            } else {
                //echo "</br>No se genera deuda</br>";
                $forma_pago= "Contado";
            }
            //Obtenemos los datos del vendedor
            $comando= "SELECT establecimiento, punto_expedicion, nro_venta FROM Usuarios WHERE alias= '" . $alias . "';";
            //echo "</br>" . $comando . "</br>";
            $factura= conectarBdd($comando)[0];
            //echo json_encode($factura) . "</br>";
            $comando= "SELECT * FROM Ventas WHERE id= ". $idVenta;
            $venta= conectarBdd($comando)[0];
            //echo json_encode($venta) . "</br>";
            $nro_venta= intval($factura['nro_venta']) + 1;
            $comando= "UPDATE Usuarios SET nro_venta = " . $nro_venta . " WHERE alias= '" . $alias . "';";
            modificarBdd($comando);
            //generamos el numero de factura y actualizamos los datos de laVenta
            $nro_factura= sprintf("%'.03d", intval($factura['establecimiento'])) . "-" . sprintf("%'.03d", intval($factura['punto_expedicion'])) . "-" . sprintf("%'.07d", $nro_venta);
            //echo $nro_factura . "</br>";
            $comando= "UPDATE Ventas SET numero_factura= '" . $nro_factura . "' WHERE id = " . $idVenta;
            modificarBdd($comando);
            //echo "</br>Mostramos los datos</br>";
            $comando= "SELECT * FROM Clientes WHERE cedula= ". $cedula;
            $cliente= conectarBdd($comando)[0];
            //echo json_encode($cliente) . "</br>";
            $comando= "SELECT p.nombre, p.iva, dv.cantidad, dv.descuento, dv.precio_venta FROM Detalle_ventas dv JOIN Productos p ON p.id=dv.producto_fk WHERE Venta_fk= " . $idVenta;
            $detalle_ventas= conectarBdd($comando);
            //echo json_encode($detalle_ventas) . "</br>";
            $factura= $_POST['usuario'];
            $comando= "SELECT cod FROM Timbrados WHERE ((fech_autorizacion < '" . $fecha . "') AND (fech_vencimiento > '" . $fecha . "'));";
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
            $pdf -> Cell($longitud, $altura, $nro_factura, 0, 1, 'R');
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
            $pdf -> Cell($longitud, $altura, $nro_factura, 0, 1, 'R');
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
            $pdf -> Output('factura.pdf', "I");
        ?>
    </body>
</html>