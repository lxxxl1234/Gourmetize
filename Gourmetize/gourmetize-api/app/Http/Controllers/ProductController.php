<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query()->with('producer:id,name')->latest();
        if (!$request->user() || $request->user()->role !== 'admin') {
            $query->where('active', true)->where('stock', '>', 0);
        }
        return response()->json($query->paginate(24));
    }

    public function mine(Request $request)
    {
        abort_unless(in_array($request->user()->role, ['producer', 'admin'], true), 403);
        $query = Product::query()->with('producer:id,name')->latest();
        if ($request->user()->role === 'producer') $query->where('producer_id', $request->user()->id);
        return response()->json($query->paginate(50));
    }

    public function store(Request $request)
    {
        abort_unless(in_array($request->user()->role, ['producer', 'admin'], true), 403);
        $data = $this->validated($request);
        $data['producer_id'] = $request->user()->id;
        return response()->json(Product::create($data)->load('producer:id,name'), 201);
    }

    public function update(Request $request, Product $product)
    {
        $this->authorizeOwner($request, $product);
        $product->update($this->validated($request, false));
        return response()->json($product->fresh()->load('producer:id,name'));
    }

    public function destroy(Request $request, Product $product)
    {
        $this->authorizeOwner($request, $product);
        $product->delete();
        return response()->noContent();
    }

    private function authorizeOwner(Request $request, Product $product): void
    {
        abort_unless($request->user()->role === 'admin' || $product->producer_id === $request->user()->id, 403);
    }

    private function validated(Request $request, bool $creating = true): array
    {
        return $request->validate([
            'name' => [$creating ? 'required' : 'sometimes', 'string', 'max:120'],
            'description' => ['nullable', 'string', 'max:2000'],
            'category' => ['nullable', 'string', 'max:80'],
            'price_cents' => [$creating ? 'required' : 'sometimes', 'integer', 'min:1'],
            'stock' => [$creating ? 'required' : 'sometimes', 'integer', 'min:0'],
            'harvest_date' => ['nullable', 'date'],
            'active' => ['sometimes', 'boolean'],
        ]);
    }
}
