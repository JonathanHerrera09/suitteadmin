<?php

namespace App\Http\Controllers\Api;
use App\Helpers\DatabaseHelper;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\TypeService;

class deliveryController extends Controller
{
    public function setup($kitchen)
    {
        $bd_account=DatabaseHelper::ConnectMaster($kitchen);
        DatabaseHelper::Connect($bd_account);
    }
    public function index($kitchen,Order $orderModel)
    {
        $this->setup($kitchen);
        return response()->json($orderModel->getOrderByStatus('1'));
    }
    public function show(string $kitchen,string $id)
    {
        $this->setup($kitchen);
        $Order = new Order();
        $dato['product'] = $Order->getOrderBy($id);
        /* $dato['product'] = Order::find( $id); */
        $dato['typeService'] = TypeService::all();
        return $dato;
    }
    public function update(Request $request, $kitchen)
    {
        $this->setup($kitchen);
        $Order = new Order(); 
        $type = $request->input('type');
        if($type == 0){
            $product = $request->input('product');
            $AllProducts=Order::find($product);
            $ProductI=json_decode($AllProducts->products);
            $bndr = 0;
            foreach($ProductI as $item){
                if($item->priority == 1){
                    $bndr=1;
                }
            }
            if($bndr == 0){
                $Order = Order::findOrFail($product);
                $Order->status = 2;
                $Order->save();
                $dato['msg']='Se actualizo correctamente';
                $dato['type']=1;
            }else{
                $dato['msg']='Aun hay productos sin estar preparados';
                $dato['type']=0;
            }
        }else{
            $product = $request->input('product');
            $AllProducts=Order::find($product['id_or']);
            $ProductI=json_decode($AllProducts->products);
            $bndr = 0;
            $product['priority']=3;
            foreach($ProductI as $item){
                if($item->priority == 1){
                    $bndr=1;
                }
            }
            if($bndr == 0){
                $Order = Order::findOrFail($product);
                $Order->status = 2;
                $Order->save();
                $dato['msg']='Se actualizo correctamente';
                $dato['type']=1;
            }else{
                
                print_r($product);
                $dato['msg']='Aun hay productos sin estar preparados';
                $dato['type']=0;
            }
            /* print_r($AllProducts); */
        }
        /* print_r($type); */
        
       /*  $Order = Order::findOrFail($request->id);
        $Order->products = json_encode($request->product);
        $Order->save();
        return $Order;*/
    } 
}