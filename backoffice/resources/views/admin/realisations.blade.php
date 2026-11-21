@extends('admin.layout')
@section('title','Réalisations')
@section('content')
<div class="top"><h1>Réalisations</h1></div>
<div class="card"><h2>Ajouter une réalisation</h2>
<form method="post" action="{{ route('admin.realisations.store') }}" class="form-grid">@csrf
<div><label>Titre</label><input name="title" required></div><div><label>Client</label><input name="client"></div>
<div><label>Lieu</label><input name="location"></div><div><label>URL image de couverture</label><input name="cover"></div>
<div style="grid-column:1/-1"><label>Description</label><textarea name="description"></textarea></div>
<div><label style="display:flex;gap:8px"><input type="checkbox" name="featured" value="1" style="width:auto"> Mise en avant</label></div>
<div><label style="display:flex;gap:8px"><input type="checkbox" name="active" value="1" checked style="width:auto"> Actif</label></div>
<div style="grid-column:1/-1"><button class="btn">Ajouter</button></div></form></div>
<div class="card"><table><thead><tr><th>Titre</th><th>Client</th><th>Lieu</th><th>Statut</th><th></th></tr></thead><tbody>
@foreach($items as $item)<tr><td>{{ $item->title }}</td><td>{{ $item->client ?? '-' }}</td><td>{{ $item->location ?? '-' }}</td><td>{{ $item->active ? 'Actif' : 'Inactif' }}</td><td><form method="post" action="{{ route('admin.realisations.delete',$item) }}" onsubmit="return confirm('Supprimer ?')">@csrf @method('DELETE')<button class="btn danger">Supprimer</button></form></td></tr>@endforeach
</tbody></table>{{ $items->links() }}</div>
@endsection
