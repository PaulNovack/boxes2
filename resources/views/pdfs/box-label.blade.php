<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            font-size: 12px;
        }
        .label {
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
            text-align: center;
        }
        .box-name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 4px;
        }
        .box-id {
            font-size: 13px;
            color: #666;
            margin-bottom: 12px;
        }
        .weight {
            font-size: 11px;
            color: #888;
            margin-bottom: 8px;
        }
        .qr-section {
            margin: 16px 0;
        }
        .qr-section img {
            width: 120px;
            height: 120px;
        }
        .qr-label {
            font-size: 10px;
            color: #888;
            margin-top: 4px;
        }
        .items-section {
            margin-top: 16px;
            text-align: left;
        }
        .items-section h3 {
            font-size: 13px;
            margin-bottom: 6px;
            border-bottom: 2px solid #333;
            padding-bottom: 4px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11px;
        }
        table th {
            background: #f0f0f0;
            text-align: left;
            padding: 5px 8px;
            border-bottom: 1px solid #ccc;
            font-weight: 600;
        }
        table td {
            padding: 4px 8px;
            border-bottom: 1px solid #eee;
        }
        table tr:nth-child(even) td {
            background: #fafafa;
        }
        .col-qty {
            text-align: center;
            width: 50px;
        }
        .col-name {
            text-align: left;
        }
    </style>
</head>
<body>
    <div class="label">
        <div class="box-name">{{ $box->name }}</div>
        <div class="box-id">Box #{{ $box->id }}</div>

        @if($box->weight)
            <div class="weight">Weight: {{ $box->weight }} lbs</div>
        @endif

        <div class="qr-section">
            <img src="{{ $qrCode }}" alt="QR Code" />
            <div class="qr-label">Scan to view items</div>
        </div>

        @if($items->isNotEmpty())
            <div class="items-section">
                <h3>Contents ({{ $items->count() }} {{ Str::plural('item', $items->count()) }})</h3>
                <table>
                    <thead>
                        <tr>
                            <th class="col-qty">Qty</th>
                            <th class="col-name">Item Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($items as $item)
                            <tr>
                                <td class="col-qty">{{ $item->quantity }}</td>
                                <td class="col-name">{{ $item->name }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        @endif
    </div>
</body>
</html>
