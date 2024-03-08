<?php

namespace App\Http\Controllers\Api;
use App\Helpers\DatabaseHelper;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\TypeService;

class kitchenController extends Controller
{
    public function setup($kitchen)
    {
        $bd_account=DatabaseHelper::ConnectMaster($kitchen);
        DatabaseHelper::Connect($bd_account);
    }
    public function index($kitchen, Order $orderModel)
    {
        $this->setup($kitchen);
        return response()->json($orderModel->getOrderByStatus('1'));
    }
    public function show($kitchen, string $id)
    {
        $this->setup($kitchen);
        $Order = new Order();
        $dato['product'] = $Order->getOrderBy($id);
        /* $dato['product'] = Order::find( $id); */
        $dato['typeService'] = TypeService::all();
        return $dato;
    }
    public function update(Request $request,$kitchen, string $id)
    {
        $this->setup($kitchen);
        $Order = Order::findOrFail($request->id);
        $Order->products = json_encode($request->product);
        $Order->save();
        return $Order;
    }
}