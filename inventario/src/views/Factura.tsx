import { Text, View, Document, Page, StyleSheet } from '@react-pdf/renderer';
import { Usuario } from '../models/usuarios';
import { Cliente } from '../models/clientes';
import { informacion_empresa } from '../main';
import { recuperarClientes } from '../modulos/clientes/controllers/recuperar';
import { recuperarUsuarios } from '../modulos/usuarios/controllers/recuperar';

export default function Factura({
    //tamanho_hoja: PageSize = "A4", 
    num_factura
}: {num_factura: string}) {

    const styles = StyleSheet.create({
        page: {
            fontFamily: 'Open Sans',
            fontSize: 11,
            paddingTop: 30,
            paddingBottom: 40,
            paddingHorizontal: 40,
            lineHeight: 1.4,
            flexDirection: 'column',
        },
        sectionHeader: {
            fontSize: 14,
            fontWeight: 'bold' as const,
            marginBottom: 8,
            color: '#003366',
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomWidth: 2,
            borderBottomColor: '#003366',
            borderBottomStyle: 'solid',
            paddingBottom: 12,
            marginBottom: 10,
        },
        emisorInfo: {
            flex: 1,
        },
        invoiceTitleBlock: {
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
        },
        invoiceTitle: {
            fontSize: 24,
            color: '#003366',
            fontWeight: 'bold' as const,
        },
        invoiceNumber: {
            marginTop: 4,
            fontSize: 12,
        },
        infoSection: {
            marginBottom: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        infoBlock: {
            flex: 1,
            paddingRight: 10,
        },
        label: {
            fontWeight: 'bold' as const,
            marginBottom: 3,
            color: '#222222',
        },
        tableContainer: {
            marginTop: 10,
            borderWidth: 1,
            borderColor: '#999999',
            borderStyle: 'solid',
            borderRadius: 2,
        },
        tableHeader: {
            flexDirection: 'row',
            backgroundColor: '#003366',
            color: 'white',
            fontWeight: 'bold' as const,
            fontSize: 12,
            paddingVertical: 6,
            paddingHorizontal: 4,
        },
        tableRow: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#999999',
            borderBottomStyle: 'solid',
            paddingVertical: 6,
            paddingHorizontal: 4,
        },
        tableCellDescription: {
            flex: 4,
            paddingRight: 4,
        },
        tableCellSmall: {
            flex: 1,
            textAlign: 'right' as const,
        },
        totalsContainer: {
            marginTop: 6,
            flexDirection: 'row',
            justifyContent: 'flex-end',
        },
        totalsLabel: {
            fontWeight: 'bold' as const,
            fontSize: 12,
            paddingRight: 12,
        },
        totalsValue: {
            fontSize: 12,
            width: 100,
            textAlign: 'right' as const,
        },
        footer: {
            position: 'absolute',
            fontSize: 8,
            bottom: 30,
            left: 40,
            right: 40,
            textAlign: 'center' as const,
            color: 'gray',
        },
    });

    function formateoMoneda(monto: number, moneda?: string) {
        return (moneda ? moneda + ' ' : '') + monto.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    const InvoicePDF: React.FC<{ data: {
        emisor: Usuario;
        comprador: Cliente;
        numeroFactura: string;
        fechaFactura: number;
        productos: { id_producto: number, cantidad: number, precio: number }[];
        }}> = ({ data }) => {

        const subtotal = data.productos.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
        const taxRate = 0.1; // Assuming 10% tax for example
        const taxAmount = subtotal * taxRate;
        const total = subtotal + taxAmount;

        return (
            <Document>
                <Page size="A4" style={styles.page}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.emisorInfo}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#003366' }}>{informacion_empresa.razon_social}</Text>
                            {informacion_empresa.ruc && <Text>RUC: {informacion_empresa.ruc}</Text>}
                            {informacion_empresa.direccion && <Text>{informacion_empresa.direccion}</Text>}
                            {informacion_empresa.ciudad && <Text>{informacion_empresa.ciudad}</Text>}
                            {informacion_empresa.telefono && <Text>Tel: {informacion_empresa.telefono}</Text>}
                        </View>
                        <View style={styles.invoiceTitleBlock}>
                            <Text style={styles.invoiceTitle}>FACTURA</Text>
                            <Text style={styles.invoiceNumber}>N° {data.numeroFactura}</Text>
                            <Text style={{ marginTop: 4 }}>Fecha: {data.fechaFactura}</Text>
                        </View>
                    </View>

                    {/* comprador and emisor Info */}
                    <View style={styles.infoSection}>
                        <View style={styles.infoBlock}>
                            <Text style={styles.label}>Cliente / Comprador:</Text>
                            <Text>{data.comprador.isEmpresa ? data.comprador.nombres + ' ' + data.comprador.apellidos : data.comprador.razon_social}</Text>
                            {data.comprador.cedula && <Text>CI/RUC: {data.comprador.cedula+'-'+data.comprador.ruc}</Text>}
                            {data.comprador.direccion && <Text>{data.comprador.direccion}</Text>}
                        </View>
                        <View style={styles.infoBlock}>
                            <Text style={styles.label}>Emisión:</Text>
                            <Text>Fecha: {data.fechaFactura}</Text>
                        </View>
                    </View>

                    {/* Items Table */}
                    <View style={styles.tableContainer}>
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableCellDescription}>Descripción</Text>
                            <Text style={styles.tableCellSmall}>Cantidad</Text>
                            <Text style={styles.tableCellSmall}>Precio Unit.</Text>
                            <Text style={styles.tableCellSmall}>Total</Text>
                        </View>
                        {data.productos.map((item, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCellDescription}>{"item.description"}</Text>
                                <Text style={styles.tableCellSmall}>{item.cantidad}</Text>
                                <Text style={styles.tableCellSmall}>{formateoMoneda(item.precio)}</Text>
                                <Text style={styles.tableCellSmall}>{formateoMoneda(item.cantidad * item.precio)}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Totals */}
                    <View style={styles.totalsContainer}>
                        <View style={{ flexDirection: 'column', width: 220 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.totalsLabel}>Subtotal:</Text>
                                <Text style={styles.totalsValue}>{formateoMoneda(subtotal)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.totalsLabel}>IVA (10%):</Text>
                                <Text style={styles.totalsValue}>{formateoMoneda(taxAmount)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ ...styles.totalsLabel, fontSize: 14 }}>TOTAL:</Text>
                                <Text style={{ ...styles.totalsValue, fontSize: 14 }}>{formateoMoneda(total)}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.footer}>
                        Documento autorizado por la Subsecretaría de Estado de Tributación (SET) - Paraguay.
                    </Text>
                </Page>
            </Document>
        );
    }

    const usuario: Usuario= recuperarUsuarios()[0];
    const cliente: Cliente= recuperarClientes()[0];
    return (
        <InvoicePDF data={{
            emisor: usuario, // Aquí debes pasar los datos del emisor
            comprador: cliente, // Aquí debes pasar los datos del comprador
            numeroFactura: num_factura,
            fechaFactura: Date.now(), // O la fecha que necesites
            productos: [] // Aquí debes pasar los productos
        }} />
    );
} // React-pdf