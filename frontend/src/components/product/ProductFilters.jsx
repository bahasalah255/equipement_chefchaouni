export default function ProductFilters({ categories = [], category = '', onCategoryChange }) {
  return (
    <aside className="rounded-3xl border border-stone-200 bg-white p-5 shadow-soft">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange">Filtres</p>
      <div className="mt-4 space-y-4 text-sm">
        <div>
          <label className="mb-2 block font-medium text-stone-700">Catégorie</label>
          <select value={category} onChange={(event) => onCategoryChange?.(event.target.value)} className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-orange">
            <option value="">Toutes</option>
            {categories.map((item) => <option key={item.id} value={item.slug}>{item.name}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-2 block font-medium text-stone-700">Marque</label>
          <select className="w-full rounded-2xl border border-stone-200 px-4 py-3 outline-none focus:border-orange">
            <option>Toutes</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block font-medium text-stone-700">Gamme de prix</label>
          <input type="range" className="w-full accent-orange" />
        </div>
      </div>
    </aside>
  )
}