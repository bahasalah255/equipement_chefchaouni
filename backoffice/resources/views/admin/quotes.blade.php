@extends('admin.layout')
@section('title','Demandes de devis')
@section('content')
<div class="top"><h1>Demandes de devis</h1></div>
<div class="card"><table><thead><tr><th>Client</th><th>Contact</th><th>Produits / message</th><th>Date</th><th>Statut</th><th></th></tr></thead><tbody>
@foreach($items as $quote)<tr><td><strong>{{ $quote->name }}</strong><br>{{ $quote->company }}</td><td>{{ $quote->phone }}<br>{{ $quote->email }}</td>
<td><small>{{ $quote->message }}</small>@if($quote->products)<br><strong>Produits :</strong> {{ collect($quote->products)->pluck('name')->join(', ') }}@endif</td>
<td>{{ $quote->created_at->format('d/m/Y') }}</td><td><form method="post" action="{{ route('admin.quotes.update',$quote) }}">@csrf @method('PATCH')<select name="status" onchange="this.form.submit()"><option {{ $quote->status==='nouveau'?'selected':'' }}>nouveau</option><option {{ $quote->status==='en cours'?'selected':'' }}>en cours</option><option {{ $quote->status==='traité'?'selected':'' }}>traité</option></select></form></td>
<td><form method="post" action="{{ route('admin.quotes.delete',$quote) }}" onsubmit="return confirm('Supprimer ?')">@csrf @method('DELETE')<button class="btn danger">Supprimer</button></form></td></tr>@endforeach
</tbody></table>{{ $items->links() }}</div>
@endsection
