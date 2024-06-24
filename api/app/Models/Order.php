<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['type_service_id', 'description', 'price','products'];

    public function typeService()
    {
        return $this->belongsTo(TypeService::class);
    }

    public function getOrderByStatus(string $status)
    {
        return $this->join('type_services', 'orders.typeService', '=', 'type_services.id')
            ->join('status', 'orders.status', '=', 'status.id')
            ->select('orders.*', 'type_services.name as type_service_name','status.name as status_name')
            ->where('orders.status', $status)->get();
    }
    public function getOrderBy(string $id)
    {
        return $this->join('type_services', 'orders.typeService', '=', 'type_services.id')
            ->join('status', 'orders.status', '=', 'status.id')
            ->select('orders.*', 'type_services.name as type_service_name','status.name as status_name')
            ->where('orders.id', $id)->first();;
    }
   
}
