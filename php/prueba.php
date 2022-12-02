<?php
    require('./fpdf.php');

    //Definicion de variables
    class PDF extends FPDF {
        const ALTURA= 4;
        function Cabecero() {
            $this->Cell(8,self::ALTURA,'Cant',1);
            $this->Cell(43,self::ALTURA,'Producto',1);
            $this->Cell(11,self::ALTURA,'Desc',1);
            $this->Cell(8,self::ALTURA,'Iva',1);
            $this->Cell(17,self::ALTURA,'Sub',1);
            $this->Ln();
        }
        function Cuerpo($cant, $producto, $descuento, $iva, $subtotal) {
            $this->Cell(8,self::ALTURA,$cant,1);
            $this->Cell(43,self::ALTURA,$producto,1);
            $this->Cell(11,self::ALTURA,$descuento,1);
            $this->Cell(8,self::ALTURA,$iva,1);
            $this->Cell(17,self::ALTURA,$subtotal,1);
            $this->Ln();
        }
    }

    $pdf= new PDF('P', 'mm', 'Letter');
    $espaciado= 93;
    $longitud= 87;
    $altura= 4;
    $empr_nombre= utf8_decode("Gua'iteño House");
    $empr_ruc= "4360067-0";
    $empr_dir= "Villarrica - Paraguay";
    $emp_timbrado= 1234;
    $suc= 1;
    $puest= 1;
    $nro_venta= 1;
    $client_ruc= "1234567-8";
    $client_nomb= "Robert Downey Jr.";
    $clien_dir= "Villarrica Paraguay";
    $fecha= "26/12/2023";
    $forma_pago= "Contado";
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
    $pdf -> Cell($longitud, $altura, sprintf("%'.03d", $suc) . "-" . sprintf("%'.03d", $puest) . "-" . sprintf("%'.09d", $nro_venta), 0, 1, 'R');
    //Datos del cliente
    $pdf -> Cell($longitud, $altura, "Fecha de la compra: ". $fecha, 0, 1);
    $pdf -> Cell($longitud, $altura, "Nombre del cliente: " . $client_nomb, 0, 1);
    $pdf -> Cell($longitud/2, $altura, "Ruc: " . $client_ruc, 0);
    $pdf -> Cell($longitud/2, $altura, 'Forma de pago: ' . $forma_pago, 0, 1);
    $pdf -> Cell($longitud, $altura, "Direccion: " . $clien_dir, 0, 1);
    //Tabla de prductos y calculos
    $grav_exent= 0;
    $grav_5= 0;
    $grav_10= 0;
    $pdf-> Cabecero();
    $pdf-> Cuerpo(100, 'producto', 100000, 'Exen', 1000000000);
    //Muestra el monto total y las gravadas
    $pdf -> Cell($longitud/2, $altura, "Total grav. 10%: ", 0);
    $pdf -> Cell($longitud/2, $altura, number_format($grav_5, 2), 0, 1, 'R');
    $pdf -> Cell($longitud/2, $altura, "Total grav. 5%: ", 0);
    $pdf -> Cell($longitud/2, $altura, number_format($grav_10, 2), 0, 1, 'R');
    $pdf -> Cell($longitud/2, $altura, "Total Exenta: ", 0);
    $pdf -> Cell($longitud/2, $altura, number_format($grav_exent, 2), 0, 1, 'R');
    $pdf -> Cell($longitud, $altura, "Monto total", 0, 1, 'C');
    $pdf -> SetFont('Arial', 'B', 14);
    $pdf -> Cell($longitud, 5, number_format($grav_5 + $grav_10 + $grav_exent, 0) . " gs.", 0, 1, 'C');
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
    $pdf -> Cell($longitud, $altura, sprintf("%'.03d", $suc) . "-" . sprintf("%'.03d", $puest) . "." . sprintf("%'.09d", $nro_venta), 0, 1, 'R');
    //Datos del cliente
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud, $altura, "Fecha de la compra: ". $fecha, 0, 1);
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud, $altura, "Nombre del cliente: " . $client_nomb, 0, 1);
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud/2, $altura, "Ruc: " . $client_ruc, 0);
    $pdf -> Cell($longitud/2, $altura, 'Forma de pago: ' . $forma_pago, 0, 1);
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud, $altura, "Direccion: " . $clien_dir, 0, 1);
    //Tabla de prductos y calculos
    $grav_exent= 0;
    $grav_5= 0;
    $grav_10= 0;
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf-> Cabecero();
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf-> Cuerpo(100, 'producto', 100000, 'Exen', 1000000000);
    //Muestra el monto total y las gravadas
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud/2, $altura, "Total grav. 10%: ", 0);
    $pdf -> Cell($longitud/2, $altura, number_format($grav_5, 2), 0, 1, 'R');
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud/2, $altura, "Total grav. 5%: ", 0);
    $pdf -> Cell($longitud/2, $altura, number_format($grav_10, 2), 0, 1, 'R');
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud/2, $altura, "Total Exenta: ", 0);
    $pdf -> Cell($longitud/2, $altura, number_format($grav_exent, 2), 0, 1, 'R');
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud, $altura, "Monto total", 0, 1, 'C');
    $pdf -> SetFont('Arial', 'B', 14);
    $pdf -> Cell($espaciado, $altura, "|", 0, 0, "R");
    $pdf -> Cell($longitud, 5, number_format($grav_5 + $grav_10 + $grav_exent, 0) . " gs.", 0, 1, 'C');
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