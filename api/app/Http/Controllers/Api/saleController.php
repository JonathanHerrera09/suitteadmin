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
        return $Order; 
    }
}
