@extends('admin.layout')
@section('title','Messages')
@section('content')
<div class="top"><h1>Messages de contact</h1></div>
<div class="card"><table><thead><tr><th>Client</th><th>Contact</th><th>Sujet / message</th><th>Date</th><th>Statut</th><th></th></tr></thead><tbody>
@foreach($items as $message)<tr><td><strong>{{ $message->name }}</strong></td><td>{{ $message->phone }}<br>{{ $message->email }}</td><td><strong>{{ $message->subject }}</strong><br><small>{{ $message->message }}</small></td><td>{{ $message->created_at->format('d/m/Y') }}</td>
<td><form method="post" action="{{ route('admin.messages.update',$message) }}">@csrf @method('PATCH')<select name="status" onchange="this.form.submit()"><option {{ $message->status==='nouveau'?'selected':'' }}>nouveau</option><option {{ $message->status==='lu'?'selected':'' }}>lu</option><option {{ $message->status==='traité'?'selected':'' }}>traité</option></select></form></td>
<td><form method="post" action="{{ route('admin.messages.delete',$message) }}" onsubmit="return confirm('Supprimer ?')">@csrf @method('DELETE')<button class="btn danger">Supprimer</button></form></td></tr>@endforeach
</tbody></table>{{ $items->links() }}</div>
@endsection
