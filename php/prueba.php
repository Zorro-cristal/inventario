<?php
    require('./fpdf.php');

    class PDF extends FPDF {
        const ALTURA= 7;
        function Cabecero() {
            $this->Cell(10,self::ALTURA,'Cant',1);
            $this->Cell(115,self::ALTURA,'Producto',1);
            $this->Cell(15,self::ALTURA,'Desc',1);
            $this->Cell(13,self::ALTURA,'Iva',1);
            $this->Cell(25,self::ALTURA,'Sub',1);
            $this->Ln();
        }
        function Cuerpo($cant, $producto, $descuento, $iva, $subtotal) {
            $this->Cell(10,self::ALTURA,$cant,1);
            $this->Cell(115,self::ALTURA,$producto,1);
            $this->Cell(15,self::ALTURA,$descuento,1);
            $this->Cell(13,self::ALTURA,$iva,1);
            $this->Cell(25,self::ALTURA,$subtotal,1);
            $this->Ln();
        }
    }
    //Creacion del PDF
    $pdf= new PDF('P', 'mm', 'Letter');
    $pdf-> AliasNbPages();
    $pdf -> AddPage();
    $pdf -> SetFont('Arial', 'B', 12);
    $pdf -> Cell(180, 5, "Factura virtual", 0, 1, 'C');
    $pdf -> SetFont('Arial', 'B', 8);
    //Datos del cliente
    $pdf -> Cell(120, 5, "Fecha de la compra: ", 0, 1);
    $pdf -> Cell(120, 5, "Nombre del cliente: ", 0, 1);
    $pdf -> Cell(120, 5, "Ruc: ", 0, 1);
    $pdf -> Cell(120, 5, "Direccion: ", 0, 1);
    $pdf -> Cell(120, 5, 'Forma de pago: ', 0, 1);
    $pdf -> Ln();
    //Datos de la factura
    $pdf -> Image('../assets/logo_oficial.png', 120, 15, 20, 20);
    $pdf -> SetY(15);
    $pdf -> Cell(130, 5);
    $empresa= utf8_decode("Gua'iteño House");
    $pdf -> Cell(40, 5, $empresa, 0, 1, 'C');
    $pdf -> Cell(130, 5);
    $pdf -> Cell(40, 5, "4360067-0", 0, 1, 'C');
    $pdf -> Cell(130, 5);
    $pdf -> Cell(40, 5, "Villarrica-Paraguay", 0, 1, 'C');
    $pdf -> Cell(130, 5);
    $pdf -> Cell(40, 5, "Timbrado Nro.:", 0, 1, 'C');
    $pdf -> Cell(130, 5);
    $pdf -> Cell(40, 5, "000-000-00000", 0, 1, 'C');
    //Tabla de prductos
    $pdf-> Cabecero();
    $pdf-> Cuerpo(100, 'producto', 100000, 'Exenta', 1000000000);
    //Muestra el monto total
    $pdf -> Cell(20, 15);
    $pdf -> Cell(20, 15, "Monto total: ");
    $pdf -> SetFont('Arial', 'B', 14);
    $pdf -> Cell(20, 15);
    $pdf -> Cell(20, 15, "100.000.000 gs.", 0, 1);
    $pdf -> SetFont('Arial', 'B', 10);
    //Resumen de informacion
    $pdf -> Cell(35, 5, "Total grav. 5%: ");
    $pdf -> Cell(35, 5);
    $pdf -> Cell(35, 5, "IVA. 5%: ", 0, 1);
    $pdf -> Cell(35, 5, "Total grav. 10%: ");
    $pdf -> Cell(35, 5);
    $pdf -> Cell(35, 5, "IVA. 10%: ", 0, 1);
    $pdf -> Cell(35, 5, "Total grav. Exenta: ");
    $pdf -> Cell(35, 5);
    $pdf -> Cell(35, 5, "Exenta: ", 0, 1);
    //Muestra el archivo generado
    $pdf -> Output('factura', "I");
?>