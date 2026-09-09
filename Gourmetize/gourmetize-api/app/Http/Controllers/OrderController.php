<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $query = Order::with(['items', 'consumer:id,name,email', 'producer:id,name,email'])->latest();
        if ($user->role === 'consumer') $query->where('consumer_id', $user->id);
        elseif ($user->role === 'producer') $query->where('producer_id', $user->id);
        elseif ($user->role !== 'admin') abort(403);
        return response()->json($query->paginate(30));
    }

    public function store(Request $request)
    {
        abort_unless($request->user()->role === 'consumer', 403);
        $payload = $request->validate(['items' => ['required', 'array', 'min:1', 'max:50'], 'items.*.product_id' => ['required', 'integer', 'exists:products,id'], 'items.*.quantity' => ['required', 'integer', 'min:1', 'max:99']]);

        $order = DB::transaction(function () use ($payload, $request) {
            $products = collect($payload['items'])->map(function ($item) {
                $product = Product::query()->lockForUpdate()->findOrFail($item['product_id']);
                if (!$product->active || $product->stock < $item['quantity']) {
                    throw ValidationException::withMessages(['items' => ["O produto {$product->name} não está disponível na quantidade solicitada."]]);
                }
                return ['product' => $product, 'quantity' => $item['quantity']];
            });
            $producerId = $products->first()['product']->producer_id;
            if ($products->contains(fn ($item) => $item['product']->producer_id !== $producerId)) {
                throw ValidationException::withMessages(['items' => ['Cada pedido deve conter produtos de apenas um produtor.']]);
            }
            $total = $products->sum(fn ($item) => $item['product']->price_cents * $item['quantity']);
            $order = Order::create(['consumer_id' => $request->user()->id, 'producer_id' => $producerId, 'total_cents' => $total, 'status' => 'new']);
            foreach ($products as $item) {
                $product = $item['product'];
                $order->items()->create(['product_id' => $product->id, 'product_name' => $product->name, 'unit_price_cents' => $product->price_cents, 'quantity' => $item['quantity']]);
                $product->decrement('stock', $item['quantity']);
            }
            return $order;
        });
        return response()->json($order->load(['items', 'producer:id,name']), 201);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $user = $request->user();
        abort_unless($user->role === 'admin' || ($user->role === 'producer' && $order->producer_id === $user->id), 403);
        $data = $request->validate(['status' => ['required', 'in:new,preparing,delivering,completed,cancelled']]);
        $order->update($data);
        return response()->json($order->fresh()->load(['items', 'consumer:id,name,email', 'producer:id,name,email']));
    }
}
