<?php
    require('./fpdf.php');

    class PDF extends FPDF {
        const ALTURA= 5;
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

    //Creacion del PDF
    $pdf= new PDF('P', 'mm', 'Letter');
    $espaciado= 93;
    $longitud= 87;
    $altura= 5;
    $pdf-> AliasNbPages();
    $pdf -> AddPage();
    $pdf -> SetFont('Arial', 'B', 12);
    $pdf -> Cell($longitud, $altura, "Factura virtual", 0, 1, 'C');
    $pdf -> SetFont('Arial', 'B', 8);
    //Datos de la factura
    $pdf -> Image('../assets/logo_oficial.png', 15, 15, 25, 25);
    $empresa= utf8_decode("Gua'iteño House");
    $pdf -> Cell($longitud, $altura, $empresa, 0, 1, 'R');
    $pdf -> Cell($longitud, $altura, "4360067-0", 0, 1, 'R');
    $pdf -> Cell($longitud, $altura, "Villarrica - Paraguay", 0, 1, 'R');
    $pdf -> Cell($longitud, $altura, "Timbrado Nro.:", 0, 1, 'R');
    $pdf -> Cell($longitud, $altura, "000-000-00000", 0, 1, 'R');
    //Datos del cliente
    $pdf -> Cell($longitud, $altura, "Fecha de la compra: ", 0, 1);
    $pdf -> Cell($longitud, $altura, "Nombre del cliente: ", 0, 1);
    $pdf -> Cell($longitud/2, $altura, "Ruc: ", 0);
    $pdf -> Cell($longitud/2, $altura, 'Forma de pago: ', 0, 1);
    $pdf -> Cell($longitud, $altura, "Direccion: ", 0, 1);
    //Tabla de prductos
    $pdf-> Cabecero();
    $pdf-> Cuerpo(100, 'producto', 100000, 'Exen', 1000000000);
    //Muestra el monto total y las gravadas
    $pdf -> Cell($longitud, $altura, "Total grav. 5%: ", 0, 1);
    $pdf -> Cell($longitud, $altura, "IVA. 5%: ", 0, 1);
    $pdf -> Cell($longitud, $altura, "Total grav. 10%: ", 0, 1);
    $pdf -> Cell($longitud, $altura, "Monto total", 0, 1, 'C');
    $pdf -> SetFont('Arial', 'B', 14);
    $pdf -> Cell($longitud, 5, "100.000.000 gs.", 0, 1, 'C');
    $pdf -> SetFont('Arial', 'B', 8);
    //Resumen de informacion
    $pdf -> Cell($longitud, $altura, "IVA. 10%: ", 0, 1);
    $pdf -> Cell($longitud, $altura, "Total grav. Exenta: ", 0, 1);
    $pdf -> Cell($longitud, $altura, "Exenta: ", 0, 1);
    //Repetimos todo del otro lado
    $pdf -> SetY(10);
    $pdf -> SetFont('Arial', 'B', 12);
    $pdf -> Cell($espaciado, $altura);
    $pdf -> Cell($longitud, $altura, "Factura virtual", 0, 1, 'C');
    $pdf -> SetFont('Arial', 'B', 8);
    //Datos de la factura
    $pdf -> Image('../assets/logo_oficial.png', $espaciado + 15, 15, 25, 25);
    $empresa= utf8_decode("Gua'iteño House");
    $pdf -> Cell($espaciado, $altura);
    $pdf -> Cell($longitud, $altura, $empresa, 0, 1, 'R');
    $pdf -> Cell($espaciado, $altura);
    $pdf -> Cell($longitud, $altura, "4360067-0", 0, 1, 'R');
    $pdf -> Cell($espaciado, $altura);
    $pdf -> Cell($longitud, $altura, "Villarrica - Paraguay", 0, 1, 'R');
    $pdf -> Cell($espaciado, $altura);
    $pdf -> Cell($longitud, $altura, "Timbrado Nro.:", 0, 1, 'R');
    $pdf -> Cell($espaciado, $altura);
    $pdf -> Cell($longitud, $altura, "000-000-00000", 0, 1, 'R');
    //Datos del cliente
    $pdf -> Cell($espaciado, $altura);
    $pdf -> Cell($longitud, $altura, "Fecha de la compra: ", 0, 1);
    $pdf -> Cell($espaciado, $altura);
    $pdf -> Cell($longitud, $altura, "Nombre del cliente: ", 0, 1);
    $pdf -> Cell($espaciado, $altura);
    $pdf -> Cell($longitud/2, $altura, "Ruc: ", 0);
    $pdf -> Cell($espaciado, $altura);
    $pdf -> Cell($longitud/2, $altura, 'Forma de pago: ', 0, 1);
    $pdf -> Cell($espaciado, $altura);
    $pdf -> Cell($longitud, $altura, "Direccion: ", 0, 1);
    //Tabla de prductos
    $pdf -> Cell($espaciado, $altura);
    $pdf-> Cabecero();
    $pdf -> Cell($espaciado, $altura);
    $pdf-> Cuerpo(100, 'producto', 100000, 'Exen', 1000000000);
    //Muestra el monto total y las gravadas
    $pdf -> Cell($espaciado, $altura);
    $pdf -> Cell($longitud, $altura, "Total grav. 5%: ", 0, 1);
    $pdf -> Cell($espaciado, $altura);
    $pdf -> Cell($longitud, $altura, "IVA. 5%: ", 0, 1);
    $pdf -> Cell($espaciado, $altura);
    $pdf -> Cell($longitud, $altura, "Total grav. 10%: ", 0, 1);
    $pdf -> Cell($espaciado, $altura);
    $pdf -> Cell($longitud, $altura, "Monto total", 0, 1, 'C');
    $pdf -> Cell($espaciado, $altura);
    $pdf -> SetFont('Arial', 'B', 14);
    $pdf -> Cell($longitud, 5, "100.000.000 gs.", 0, 1, 'C');
    $pdf -> SetFont('Arial', 'B', 8);
    //Resumen de informacion
    $pdf -> Cell($espaciado, $altura);
    $pdf -> Cell($longitud, $altura, "IVA. 10%: ", 0, 1);
    $pdf -> Cell($espaciado, $altura);
    $pdf -> Cell($longitud, $altura, "Total grav. Exenta: ", 0, 1);
    $pdf -> Cell($espaciado, $altura);
    $pdf -> Cell($longitud, $altura, "Exenta: ", 0, 1);

    //Escribimos la linea final
    $pdf -> SetX(5);
    $pdf -> Cell($longitud, $altura, str_repeat('-', $longitud*2+30));
    //Muestra el archivo generado
    $pdf -> Output('factura', "I");
?>