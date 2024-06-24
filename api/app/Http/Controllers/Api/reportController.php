<?php

namespace App\Http\Controllers\Api;

use App\Helpers\DatabaseHelper;
use Illuminate\Support\Facades\Session;

use Illuminate\Support\Facades\Cookie;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TypeService;
use App\Models\Product;
use App\Models\Order;
use App\Models\Category;
use App\Models\Status;

class reportController extends Controller
{
    public function setup($kitchen)
    {
        $bd_account = DatabaseHelper::ConnectMaster($kitchen);
        DatabaseHelper::Connect($bd_account);
    }
    public function index($kitchen)
    {
        $this->setup($kitchen);
        $dato['orders'] = Order::join('type_services', 'orders.typeService', '=', 'type_services.id')
            ->join('status', 'orders.status', '=', 'status.id')
            ->select('orders.*', 'type_services.name as type_service_name', 'status.name as status_name')
            ->get();

        return $dato;
    }
    public function exportar($kitchen)
    {
        $this->setup($kitchen);
        $dato['orders'] = Order::join('type_services', 'orders.typeService', '=', 'type_services.id')
            ->join('status', 'orders.status', '=', 'status.id')
            ->select('orders.*', 'type_services.name as type_service_name', 'status.name as status_name')
            ->get();
        return $dato;
    }
    public function index2($kitchen)
    {
        $this->setup($kitchen);
        $dato['products'] = Order::join('type_services', 'orders.typeService', '=', 'type_services.id')
            ->join('status', 'orders.status', '=', 'status.id')
            ->select('orders.id', 'orders.products', 'type_services.name as type_service_name', 'status.name as status_name')
            ->get();
        return $dato;
    }
    /* public function store(Request $request, $kitchen)
    {
        $this->setup($kitchen);
        $TypeService = new TypeService();
        $name = $request->input('name');
        $TypeService->name =  $name;
        $TypeService->save();
        return $TypeService;
    }
    public function show(string $kitchen, string $id)
    {
        $this->setup($kitchen);
        $dato['typeService'] = TypeService::find($id);
        return $dato;
    }
    public function update(Request $request, $kitchen, string $id)
    {
        $this->setup($kitchen);
        $TypeService = TypeService::findOrFail($request->id);
        $TypeService->name = $request->name;
        $TypeService->save();
        return $TypeService;
    }
    public function destroy(string $kitchen, string $id)
    {
        $this->setup($kitchen);
        $TypeService = TypeService::destroy($id);
        return $TypeService;
    } */
}
