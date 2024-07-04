<!-- resources/views/pdf/product.blade.php -->
<!DOCTYPE html>
<html>

<head>
    <title>Invoice</title>
    <style>
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            background: #f8f8f8;
        }

        .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #ddd;
            background: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        }

        .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
        }

        .invoice-box table td {
            padding: 8px;
            vertical-align: top;
        }

        .invoice-box table tr.top table td {
            padding-bottom: 20px;
        }

        .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
        }

        .invoice-box table tr.information table td {
            padding-bottom: 40px;
        }

        .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
        }

        .invoice-box table tr.details td {
            padding-bottom: 20px;
        }

        .invoice-box table tr.item td {
            border-bottom: 1px solid #eee;
        }

        .invoice-box table tr.item.last td {
            border-bottom: none;
        }

        .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
        }

        .invoice-box .logo {
            text-align: center;
            margin-bottom: 20px;
        }

        .invoice-box .logo img {
            max-width: 200px;
        }
    </style>
</head>

<body>
    <div class="invoice-box">
        <div class="logo">
		<img src="{{ public_path('assets/favicons/' . $favicon) }}" alt="Favicon">
        </div>
        <table cellpadding="0" cellspacing="0">
            <tr class="top">
                <td colspan="2">
                    <table>
                        <tr>
                            <td class="title">
                                <h1>Factura</h1>
                            </td>
                            <td>
                                Fecha: {{ date('d/m/Y') }}<br>
                                Factura #: {{ $product->id }}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr class="information">
                <td colspan="2">
                    <table>
                        <tr>
                            <td>
                                <strong>Cliente:</strong><br>
                                {{ $product->name }}<br>
                                {{ $product->address }}<br>
                                {{ $product->nbh }}
                            </td>
                            <td>
                                <strong>Servicio:</strong><br>
                                {{ $product->type_service_name }}<br>
                                <strong>Estado:</strong><br>
                                {{ $product->status_name }}
                            </td>
			     <td>
                                <strong>Medio de pago:</strong><br>
                                {{ $product->paymeth }}<br>
                             </td>

                        </tr>
                    </table>
                </td>
            </tr>
            <tr class="heading">
                <td>Descripción</td>
                <td>Precio</td>
            </tr>
            <tr class="item">
                <td>{{ $product->description }}</td>
                <td>{{ number_format($product->price, 2) }}</td>
            </tr>
            <tr class="total">
                <td></td>
                <td>Total: {{ number_format($product->price, 2) }}</td>
            </tr>
        </table>
    </div>
</body>

</html>
