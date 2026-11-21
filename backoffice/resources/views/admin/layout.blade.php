<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Back-office') - Equipement Chefchaouni</title>
    <style>
        :root{--navy:#0f2438;--orange:#f97316;--paper:#f7f5f2;--line:#e7e5e4}
        *{box-sizing:border-box} body{margin:0;background:var(--paper);font-family:Arial,sans-serif;color:#292524}
        .shell{display:grid;grid-template-columns:245px 1fr;min-height:100vh}.sidebar{background:var(--navy);color:#fff;padding:24px 16px}
        .brand{font-weight:800;margin-bottom:28px;padding:0 10px}.brand span{color:#fb923c}
        .nav a{display:block;color:#dbe4ea;text-decoration:none;padding:11px 12px;border-radius:8px;margin:3px 0;font-size:14px}
        .nav a:hover,.nav a.active{background:#1e3a52;color:#fff}.main{padding:28px}.top{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
        h1{margin:0;font-size:26px}.card{background:#fff;border:1px solid var(--line);border-radius:14px;padding:20px;margin-bottom:18px}
        .cards{display:grid;grid-template-columns:repeat(5,minmax(120px,1fr));gap:12px}.stat{background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px}
        .stat strong{display:block;font-size:28px;color:var(--navy)}.stat span{font-size:13px;color:#78716c}
        table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:11px;border-bottom:1px solid #f0edea;font-size:14px}th{color:#57534e;font-size:12px;text-transform:uppercase}
        .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.form-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
        label{display:block;font-size:13px;font-weight:700;margin-bottom:6px}input,select,textarea{width:100%;border:1px solid #d6d3d1;border-radius:8px;padding:10px;background:#fff}
        textarea{min-height:90px}.btn{border:0;border-radius8px;border-radius:8px;padding:9px 14px;background:var(--orange);color:#fff;text-decoration:none;font-weight:700;cursor:pointer;font-size:13px}
        .btn.secondary{background:#e7e5e4;color:#292524}.btn.danger{background:#dc2626}.alert{background:#dcfce7;border:1px solid #86efac;padding:10px 12px;border-radius8px;margin-bottom:16px}
        .badge{display:inline-block;padding:4px 8px;border-radius:999px;background:#e7e5e4;font-size12px}.badge.new{background:#ffedd5;color:#9a3412}.actions{display:flex;gap6px}
        @media(max-width:900px){.shell{grid-template-columns:1fr}.sidebar{display:flex;align-items:center;gap:12px;overflow:auto}.brand{margin:0}.nav{display:flex}.nav a{white-space:nowrap}.cards{grid-template-columns:repeat(2,1fr)}.grid,.form-grid{grid-template-columns:1fr}.main{padding:18px}}
    </style>
</head>
<body>
<div class="shell">
    <aside class="sidebar">
        <div class="brand">Equipement <span>Chefchaouni</span></div>
        <nav class="nav">
            <a class="{{ request()->routeIs('admin.dashboard') ? 'active' : '' }}" href="{{ route('admin.dashboard') }}">Tableau de bord</a>
            <a class="{{ request()->routeIs('admin.categories') ? 'active' : '' }}" href="{{ route('admin.categories') }}">Catégories</a>
            <a class="{{ request()->routeIs('admin.products') ? 'active' : '' }}" href="{{ route('admin.products') }}">Produits</a>
            <a class="{{ request()->routeIs('admin.realisations') ? 'active' : '' }}" href="{{ route('admin.realisations') }}">Réalisations</a>
            <a class="{{ request()->routeIs('admin.quotes') ? 'active' : '' }}" href="{{ route('admin.quotes') }}">Demandes de devis</a>
            <a class="{{ request()->routeIs('admin.messages') ? 'active' : '' }}" href="{{ route('admin.messages') }}">Messages</a>
            <a class="{{ request()->routeIs('admin.settings') ? 'active' : '' }}" href="{{ route('admin.settings') }}">Paramètres</a>
        </nav>
    </aside>
    <main class="main">
        @if(session('success'))<div class="alert">{{ session('success') }}</div>@endif
        @yield('content')
    </main>
</div>
</body>
</html>
