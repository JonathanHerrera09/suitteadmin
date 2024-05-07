<?php

namespace App\Http\Controllers\Api;
use App\Helpers\DatabaseHelper;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Order;
use App\Models\TypeService;
use App\Models\Category;
use App\Models\Banner;
use App\Models\Config;
use App\Models\Paymenth;
use Dompdf\Dompdf;

class saleController extends Controller
{
    public function setup($kitchen)
    {
        $bd_account=DatabaseHelper::ConnectMaster($kitchen);
        DatabaseHelper::Connect($bd_account);
    }
    public function index($kitchen)
    {
        $this->setup($kitchen);
        $dato['banners'] = Banner::all();
        $dato['categorys'] = Category::all();
        $dato['typeServices'] = TypeService::all();
        $dato['products'] = Product::all();
        $dato['config'] = Config::find(1);
        $dato['paymenth'] = Paymenth::all();
        return $dato;
    }
    public function store(Request $request,$kitchen)
    {
        $this->setup($kitchen);
        $Order = new Order();
        $Order->name = $request->name;
        $Order->phone = $request->phone;
        $Order->address = $request->address;
        $Order->nbh = $request->nbh;
        $Order->paymeth = $request->paymeth;
        $Order->typeService = $request->typeService;
        $Order->description = $request->description;
        $Order->price = $request->price;
        $Order->products = json_encode($request->product); 

        $Order->save();
      /*   $this->generarPDF($request, $kitchen); */
        return $Order; 
    }
    public function generarPDF(Request $request, $kitchen)
    {
        // Tu código existente aquí...

        // Crear HTML para el PDF
        $html = "<html><body>";
        $html .= "<p>Nombre: " . $request->name . "</p>";
        $html .= "<p>Teléfono: " . $request->phone . "</p>";
        // Agrega más campos según sea necesario

        $html .= "</body></html>";

        // Crear una instancia de Dompdf
        $dompdf = new Dompdf();

        // Cargar HTML en Dompdf
        $dompdf->loadHtml($html);

        // Renderizar PDF
        $dompdf->render();

        // Guardar PDF en la carpeta public/pdfs
        $pdfOutput = $dompdf->output();
        file_put_contents(public_path('pdfs/1.pdf'), $pdfOutput);
    }

}
