<?php

namespace App\Http\Controllers;

use App\Models\Box;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BoxPrintController extends Controller
{
    /**
     * Generate a printable PDF for a box with a QR code.
     */
    public function __invoke(Request $request, Box $box): Response
    {
        $this->authorize('view', $box);

        // Generate QR code linking to the box items display page
        $qrUrl = route('boxes.items.index', $box);
        $qrRenderer = new ImageRenderer(
            new RendererStyle(300),
            new SvgImageBackEnd
        );
        $qrWriter = new Writer($qrRenderer);
        $qrSvg = $qrWriter->writeString($qrUrl);
        $qrCode = 'data:image/svg+xml;base64,'.base64_encode($qrSvg);

        $items = $box->items()->orderBy('name')->get();

        $pdf = Pdf::loadView('pdfs.box-label', [
            'box' => $box,
            'items' => $items,
            'qrCode' => $qrCode,
            'qrUrl' => $qrUrl,
        ]);

        return $pdf->download("box-{$box->id}-{$box->name}.pdf");
    }
}
