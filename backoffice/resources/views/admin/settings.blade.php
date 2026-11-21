@extends('admin.layout')
@section('title','Paramètres')
@section('content')
<div class="top"><h1>Paramètres du site</h1></div>
<div class="card"><form method="post" action="{{ route('admin.settings.update') }}" class="form-grid">@csrf
<div><label>Nom de l'entreprise</label><input name="site_name" value="{{ $settings['site_name'] ?? '' }}"></div>
<div><label>Téléphone</label><input name="phone" value="{{ $settings['phone'] ?? '' }}"></div>
<div><label>Email</label><input name="email" value="{{ $settings['email'] ?? '' }}"></div>
<div><label>WhatsApp</label><input name="whatsapp" value="{{ $settings['whatsapp'] ?? '' }}"></div>
<div style="grid-column:1/-1"><label>Adresse</label><input name="address" value="{{ $settings['address'] ?? '' }}"></div>
<div style="grid-column:1/-1"><label>Description / texte à propos</label><textarea name="about" style="min-height:140px">{{ $settings['about'] ?? '' }}</textarea></div>
<div style="grid-column:1/-1"><label>Horaires</label><textarea name="hours">{{ $settings['hours'] ?? '' }}</textarea></div>
<div style="grid-column:1/-1"><button class="btn">Enregistrer les paramètres</button></div>
</form></div>
@endsection
