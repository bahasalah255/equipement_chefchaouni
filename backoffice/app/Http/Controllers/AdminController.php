<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\ContactMessage;
use App\Models\Product;
use App\Models\QuoteRequest;
use App\Models\Realisation;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    public function dashboard()
    {
        return view('admin.dashboard', [
            'counts' => [
                'categories' => Category::count(),
                'products' => Product::count(),
                'realisations' => Realisation::count(),
                'quotes' => QuoteRequest::count(),
                'messages' => ContactMessage::count(),
            ],
            'quotes' => QuoteRequest::latest()->take(5)->get(),
        ]);
    }

    public function categories()
    {
        return view('admin.categories', ['items' => Category::withCount('products')->latest()->paginate(20)]);
    }

    public function storeCategory(Request $request)
    {
        $data = $request->validate(['name' => 'required|max:255', 'icon' => 'nullable|max:255', 'active' => 'nullable']);
        $data['slug'] = Str::slug($data['name']);
        $data['active'] = $request->boolean('active');
        Category::create($data);
        return back()->with('success', 'Catégorie créée.');
    }

    public function deleteCategory(Category $category)
    {
        $category->delete();
        return back()->with('success', 'Catégorie supprimée.');
    }

    public function products()
    {
        return view('admin.products', [
            'items' => Product::with('category')->latest()->paginate(20),
            'categories' => Category::where('active', true)->orderBy('name')->get(),
        ]);
    }

    public function storeProduct(Request $request)
    {
        $data = $request->validate([
            'category_id' => 'nullable|exists:categories,id',
            'name' => 'required|max:255',
            'sku' => 'nullable|max:255',
            'brand' => 'nullable|max:255',
            'price' => 'nullable|numeric',
            'image' => 'nullable|max:255',
            'description' => 'nullable',
        ]);
        $data['slug'] = Str::slug($data['name']);
        $data['featured'] = $request->boolean('featured');
        $data['active'] = $request->boolean('active');
        Product::create($data);
        return back()->with('success', 'Produit créé.');
    }

    public function deleteProduct(Product $product)
    {
        $product->delete();
        return back()->with('success', 'Produit supprimé.');
    }

    public function realisations()
    {
        return view('admin.realisations', ['items' => Realisation::latest()->paginate(20)]);
    }

    public function storeRealisation(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|max:255',
            'client' => 'nullable|max:255',
            'location' => 'nullable|max:255',
            'cover' => 'nullable|max:255',
            'description' => 'nullable',
        ]);
        $data['slug'] = Str::slug($data['title']);
        $data['featured'] = $request->boolean('featured');
        $data['active'] = $request->boolean('active');
        Realisation::create($data);
        return back()->with('success', 'Réalisation créée.');
    }

    public function deleteRealisation(Realisation $realisation)
    {
        $realisation->delete();
        return back()->with('success', 'Réalisation supprimée.');
    }

    public function quotes()
    {
        return view('admin.quotes', ['items' => QuoteRequest::latest()->paginate(20)]);
    }

    public function updateQuote(QuoteRequest $quote, Request $request)
    {
        $quote->update(['status' => $request->validate(['status' => 'required|in:nouveau,en cours,traité'])['status']]);
        return back()->with('success', 'Statut du devis mis à jour.');
    }

    public function deleteQuote(QuoteRequest $quote)
    {
        $quote->delete();
        return back()->with('success', 'Devis supprimé.');
    }

    public function messages()
    {
        return view('admin.messages', ['items' => ContactMessage::latest()->paginate(20)]);
    }

    public function updateMessage(ContactMessage $message, Request $request)
    {
        $message->update(['status' => $request->validate(['status' => 'required|in:nouveau,lu,traité'])['status']]);
        return back()->with('success', 'Statut du message mis à jour.');
    }

    public function deleteMessage(ContactMessage $message)
    {
        $message->delete();
        return back()->with('success', 'Message supprimé.');
    }

    public function settings()
    {
        $settings = Setting::pluck('value', 'key');
        return view('admin.settings', ['settings' => $settings]);
    }

    public function updateSettings(Request $request)
    {
        foreach ($request->except(['_token']) as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
        return back()->with('success', 'Paramètres enregistrés.');
    }
}
