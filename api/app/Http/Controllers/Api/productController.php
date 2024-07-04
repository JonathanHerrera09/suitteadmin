<?php

namespace App\Http\Controllers\Api;

use App\Helpers\DatabaseHelper;
use Illuminate\Support\Facades\Session;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Illuminate\Support\Facades\Response;

use Barryvdh\DomPDF\Facade\Pdf;

use Illuminate\Support\Facades\Cookie;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Order;
use App\Models\TypeService;
use App\Models\Category;
use App\Models\Status;
use App\Models\Config;

class productController extends Controller
{
    public function setup($kitchen)
    {
        $bd_account = DatabaseHelper::ConnectMaster($kitchen);
        DatabaseHelper::Connect($bd_account);
    }
    public function updateStatus(Request $request, $kitchen)
    {
        $this->setup($kitchen);
        $ids = $request->ids;
        $status = $request->status;
        if (!empty($ids) && !empty($status)) {
            Order::whereIn('id', $ids)
                ->update(['status' => $status]);
            return response()->json(['message' => 'Estado actualizado con éxito']);
        } else {
            return response()->json(['message' => 'Datos inválidos'], 400);
        }
    }
    public function consultStatusC(string $kitchen)
    {
        $this->setup($kitchen);
        $status = Status::all();
        return $status;
    }
    public function exportPDF(string $kitchen, string $id)
    {
        $this->setup($kitchen);
        try {
            $product = Order::join('type_services', 'orders.typeService', '=', 'type_services.id')
                ->join('status', 'orders.status', '=', 'status.id')
                ->where('orders.id', $id)
                ->select('orders.*', 'type_services.name as type_service_name', 'status.name as status_name')
                ->firstOrFail();
	    $config = Config::find(1);
            $favicon = $config->favicon;

	    $pdf = Pdf::loadView('pdf.product', compact('product', 'favicon'));
            
            $filename = 'product_' . $id . '.pdf';
            $pdf->save(public_path('assets/exports/' . $filename));

            return response()->json(['filename' => $filename]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function exportSales(Request $request, string $kitchen)
    {
        try {
            $startDate = $request->input('start_date');
            $endDate = $request->input('end_date');
            $products = Order::whereBetween('created_at', [$startDate, $endDate])->get();

            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            $sheet->setCellValue('A1', 'ID');
            $sheet->setCellValue('B1', 'Producto');
            $sheet->setCellValue('C1', 'Precio');

            $row = 2;
            foreach ($products as $product) {
                $sheet->setCellValue('A' . $row, $product->id);
                $sheet->setCellValue('B' . $row, $product->name);
                $sheet->setCellValue('C' . $row, $product->price);
                $row++;
            }

            $writer = new Xlsx($spreadsheet);
            $exportPath = public_path('assets/exports');
            $filename = 'sales.xlsx';
            $filePath = $exportPath . '/' . $filename;
            $writer->save($filePath);
            return $filePath;
        } catch (\Exception $e) {
            return response()->json(['error' => $e], 500);
        }
    }
    public function index($kitchen)
    {
        $this->setup($kitchen);
        $dato['orders'] = Order::join('type_services', 'orders.typeService', '=', 'type_services.id')
            ->join('status', 'orders.status', '=', 'status.id')
            ->select('orders.*', 'type_services.name as type_service_name', 'status.name as status_name')
            ->orderBy('orders.id', 'desc')
            ->get();
        $dato['typeService'] = TypeService::all();
        $dato['products'] = Product::all();
        return $dato;
        /* return $orders; */
    }
    public function productsAll($kitchen)
    {
        $this->setup($kitchen);
        $dato['products'] = Product::all();
        $dato['category'] = Category::all();
        return $dato;
    }
    public function store(Request $request, $kitchen)
    {
        $this->setup($kitchen);
        $Order = new Order();
        $Order->typeService = $request->typeService;
        $Order->description = $request->description ?? '';
        $Order->price = $request->price;
        $Order->products = json_encode($request->product);

        $Order->save();
        return $Order;
    }
    public function productC(Request $request, $kitchen)
    {
        $this->setup($kitchen);
        $Product = new Product();
        $Product->category = $request->category;
        $Product->name = $request->name;
        $Product->description = $request->description;
        $Product->price = $request->price;
        if ($request->hasFile('img')) {
            $imagen = $request->file('img');
            $nombreImagen = $kitchen . '_' . $imagen->getClientOriginalName();
            $imagen->move(public_path('assets'), $nombreImagen);
            $Product->img = $nombreImagen;
        } else {
            $Product->img = null;
        }
        $Product->save();
        return response()->json(['mensaje' => 'Producto creado exitosamente']);
    }
    public function show(string $kitchen, string $id)
    {
        $this->setup($kitchen);
        $Order = new Order();
        $dato['product'] = Order::find($id);
        $dato['typeService'] = TypeService::all();
        return $dato;
    }
    public function productE(string $kitchen, string $id)
    {
        $this->setup($kitchen);
        $dato['product'] = Product::find($id);
        $dato['category'] = Category::all();
        return $dato;
    }
    public function update(Request $request, $kitchen, string $id)
    {
        $this->setup($kitchen);
        $Order = Order::findOrFail($request->id);
        $Order->name = $request->name;
        $Order->description = $request->description;
        $Order->price = $request->price;
        $Order->products = json_encode($request->product);
        $Order->save();
        return $Order;
    }

    public function updateProd(Request $request, string $kitchen, string $id)
    {
        $this->setup($kitchen);
        $category = $request->input('category');
        $name = $request->input('name');
        $description = $request->input('description');
        $price = $request->input('price');
        if ($request->hasFile('img')) {
            $img = $request->file('img');
            $nombreImagen = $kitchen . '_' . $img->getClientOriginalName();
            $img->move(public_path('assets'), $nombreImagen);
        }
        $product = Product::findOrFail($id);
        $product->category = $category;
        $product->name = $name;
        $product->description = $description;
        $product->price = $price;
        $product->img = $nombreImagen;
        $product->save();
        return response()->json(['mensaje' => 'Producto actualizado exitosamente']);
    }

    public function destroy(string $kitchen, string $id)
    {
        $this->setup($kitchen);
        $Order = Order::destroy($id);
        return $Order;
    }
    public function productdel(string $kitchen, string $id)
    {
        $this->setup($kitchen);
        $product = Product::destroy($id);
        return $product;
    }
}
