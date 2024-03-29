<?php
namespace App\Http\Controllers\Api;
use App\Helpers\DatabaseHelper;
use Illuminate\Support\Facades\Session;

use Illuminate\Support\Facades\Cookie;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Order;
use App\Models\TypeService;
use App\Models\Category;

class productController extends Controller
{
    public function setup($kitchen)
    {
        $bd_account=DatabaseHelper::ConnectMaster($kitchen);
        DatabaseHelper::Connect($bd_account);
    }
    public function index($kitchen)
    {      
        $this->setup($kitchen);
        $dato['orders'] = Order::join('type_services', 'orders.typeService', '=', 'type_services.id')
        ->join('status', 'orders.status', '=', 'status.id')
        ->select('orders.*', 'type_services.name as type_service_name','status.name as status_name')
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
        $Order->description = $request->description;
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
            $nombreImagen = $kitchen.'_'.$imagen->getClientOriginalName();
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
        $dato['product'] = Order::find( $id);
        $dato['typeService'] = TypeService::all();
        return $dato;
    }
    public function productE(string $kitchen, string $id)
    {
        $this->setup($kitchen);
        $dato['product'] = Product::find( $id);
        $dato['category'] = Category::all();
        return $dato;
    }
    public function update(Request $request, $kitchen, string $id )
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
            $nombreImagen = $kitchen.'_'.$img->getClientOriginalName();
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
