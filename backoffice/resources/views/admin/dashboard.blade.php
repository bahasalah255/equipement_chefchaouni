@extends('admin.layout')
@section('title','Tableau de bord')
@section('content')
<div class="top"><h1>Tableau de bord</h1><a class="btn" href="/" target="_blank">Voir le site</a></div>
<div class="cards">
    <div class="stat"><strong>{{ $counts['categories'] }}</strong><span>Catégories</span></div>
    <div class="stat"><strong>{{ $counts['products'] }}</strong><span>Produits</span></div>
    <div class="stat"><strong>{{ $counts['realisations'] }}</strong><span>Réalisations</span></div>
    <div class="stat"><strong>{{ $counts['quotes'] }}</strong><span>Devis</span></div>
    <div class="stat"><strong>{{ $counts['messages'] }}</strong><span>Messages</span></div>
</div>
<div class="card" style="margin-top:18px">
    <h2 style="margin-top:0">Dernières demandes de devis</h2>
    <table><thead><tr><th>Client</th><th>Contact</th><th>Date</th><th>Statut</th></tr></thead><tbody>
    @foreach($quotes as $quote)<tr><td>{{ $quote->name }}</td><td>{{ $quote->phone }}<br>{{ $quote->email }}</td><td>{{ $quote->created_at->format('d/m/Y H:i') }}</td><td><span class="badge new">{{ $quote->status }}</span></td></tr>@endforeach
    </tbody></table>
</div>
@endsection
