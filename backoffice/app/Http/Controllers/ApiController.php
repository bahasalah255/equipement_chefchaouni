<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\ContactMessage;
use App\Models\Product;
use App\Models\QuoteRequest;
use App\Models\Realisation;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function categories()
    {
        return response()->json(Category::where('active', true)->orderBy('name')->get());
    }

    public function products(Request $request)
    {
        $query = Product::with('category')->where('active', true);
        if ($request->filled('category')) {
            $query->whereHas('category', fn ($q) => $q->where('slug', $request->category));
        }
        if ($request->filled('search')) {
            $query->where('name', 'like', '%'.$request->search.'%');
        }
        return response()->json($query->latest()->paginate(24));
    }

    public function product(string $slug)
    {
        $product = Product::with('category')->where('slug', $slug)->where('active', true)->firstOrFail();
        return response()->json($product);
    }

    public function realisations()
    {
        return response()->json(Realisation::where('active', true)->latest()->paginate(24));
    }

    public function realisation(string $slug)
    {
        return response()->json(Realisation::where('slug', $slug)->where('active', true)->firstOrFail());
    }

    public function quote(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|max:50',
            'company' => 'nullable|max:255',
            'message' => 'nullable',
            'products' => 'nullable|array',
        ]);
        $quote = QuoteRequest::create($data);
        return response()->json(['message' => 'Votre demande de devis a été envoyée.', 'id' => $quote->id], 201);
    }

    public function contact(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|max:50',
            'subject' => 'nullable|max:255',
            'message' => 'required',
        ]);
        $message = ContactMessage::create($data);
        return response()->json(['message' => 'Votre message a été envoyé.', 'id' => $message->id], 201);
    }
}
