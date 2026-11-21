@extends('admin.layout')
@section('title','Catégories')
@section('content')
<div class="top"><h1>Catégories</h1></div>
<div class="grid">
<div class="card"><h2>Nouvelle catégorie</h2>
<form method="post" action="{{ route('admin.categories.store') }}">@csrf
<label>Nom</label><input name="name" required>
<label style="margin-top:12px">Icône / classe</label><input name="icon" placeholder="outillage">
<label style="display:flex;gap:8px;margin-top:12px"><input type="checkbox" name="active" value="1" checked style="width:auto"> Activer</label>
<button class="btn" style="margin-top:12px">Ajouter</button></form></div>
<div class="card"><table><thead><tr><th>Nom</th><th>Produits</th><th>Statut</th><th></th></tr></thead><tbody>
@foreach($items as $item)<tr><td>{{ $item->name }}</td><td>{{ $item->products_count }}</td><td>{{ $item->active ? 'Actif' : 'Inactif' }}</td><td><form method="post" action="{{ route('admin.categories.delete',$item) }}" onsubmit="return confirm('Supprimer ?')">@csrf @method('DELETE')<button class="btn danger">Supprimer</button></form></td></tr>@endforeach
</tbody></table>{{ $items->links() }}</div></div>
@endsection
