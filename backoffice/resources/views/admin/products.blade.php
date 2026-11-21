@extends('admin.layout')
@section('title','Produits')
@section('content')
<div class="top"><h1>Produits</h1></div>
<div class="card"><h2>Ajouter un produit</h2>
<form method="post" action="{{ route('admin.products.store') }}" class="form-grid">@csrf
<div><label>Nom</label><input name="name" required></div>
<div><label>Catégorie</label><select name="category_id"><option value="">Sans catégorie</option>@foreach($categories as $category)<option value="{{ $category->id }}">{{ $category->name }}</option>@endforeach</select></div>
<div><label>Référence / SKU</label><input name="sku"></div><div><label>Marque</label><input name="brand"></div>
<div><label>Prix</label><input name="price" type="number" step="0.01"></div><div><label>URL image</label><input name="image"></div>
<div style="grid-column:1/-1"><label>Description</label><textarea name="description"></textarea></div>
<div><label style="display:flex;gap:8px"><input type="checkbox" name="featured" value="1" style="width:auto"> Produit vedette</label></div>
<div><label style="display:flex;gap:8px"><input type="checkbox" name="active" value="1" checked style="width:auto"> Actif</label></div>
<div style="grid-column:1/-1"><button class="btn">Ajouter le produit</button></div></form></div>
<div class="card"><table><thead><tr><th>Produit</th><th>Catégorie</th><th>Marque</th><th>Prix</th><th>Statut</th><th></th></tr></thead><tbody>
@foreach($items as $item)<tr><td><strong>{{ $item->name }}</strong><br><small>{{ $item->sku }}</small></td><td>{{ $item->category?->name ?? '-' }}</td><td>{{ $item->brand ?? '-' }}</td><td>{{ $item->price ? number_format($item->price,2,',',' ').' DH' : '-' }}</td><td>{{ $item->active ? 'Actif' : 'Inactif' }}</td><td><form method="post" action="{{ route('admin.products.delete',$item) }}" onsubmit="return confirm('Supprimer ?')">@csrf @method('DELETE')<button class="btn danger">Supprimer</button></form></td></tr>@endforeach
</tbody></table>{{ $items->links() }}</div>
@endsection
