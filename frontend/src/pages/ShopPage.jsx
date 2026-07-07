import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../Component/Productcard.jsx'
import { productsApi } from '../api/productsApi.js'
import { categoriesApi } from '../api/categoriesApi.js'
import '../styles/pages/Shop.css'

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A to Z' },
]

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState('popular')
  const [maxPrice, setMaxPrice] = useState(1000)
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  const activeCategory = searchParams.get('category') || ''
  const searchQuery = (searchParams.get('search') || '').toLowerCase()
  const bestsellerOnly = searchParams.get('bestseller') === 'true'
  const ingredientFilter = (searchParams.get('ingredient') || '').toLowerCase()

  const setCategory = (catSlug) => {
    const next = new URLSearchParams(searchParams)
    if (catSlug) next.set('category', catSlug)
    else next.delete('category')
    setSearchParams(next)
  }

  const clearFilters = () => {
    setSearchParams({})
    setMaxPrice(1000)
    setSortBy('popular')
  }

  useEffect(() => {
    categoriesApi.list().then(setCategories).catch(() => setCategories([]))
  }, [])

  useEffect(() => {
    let mounted = true
    setLoading(true)

    const params = { limit: 200 }
    if (activeCategory) params.category = activeCategory
    if (searchQuery) params.search = searchQuery.replace(/\+/g, ' ')
    if (bestsellerOnly) params.isBestSeller = true

    productsApi
      .list(params)
      .then((res) => {
        if (mounted) setProducts(res.products || [])
      })
      .catch(() => {
        if (mounted) setProducts([])
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })

    return () => {
      mounted = false
    }
  }, [activeCategory, searchQuery, bestsellerOnly])

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice)
    if (ingredientFilter) {
  list = list.filter((p) =>
    (p.ingredients || []).some((tag) => (tag || '').toLowerCase().includes(ingredientFilter))
  )
}

    switch (sortBy) {
      case 'price-low':
        list = [...list].sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        list = [...list].sort((a, b) => b.price - a.price)
        break
      case 'name':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        break
    }

    return list
}, [products, sortBy, maxPrice, ingredientFilter])

  return (
    <>
      <section className="shop-hero">
        <div className="container">
          <span className="eyebrow">The Herbal Collection</span>
          <h1>Shop All Products</h1>
          <p>Browse our full range of pure Ayurvedic essentials — potent herbs, ancient rituals, modern wellness.</p>
        </div>
      </section>

      <section className="container shop-layout">
        <aside className={`shop-sidebar ${mobileFiltersOpen ? 'mobile-open' : ''}`}>
          <h3>Categories</h3>
          <div className="shop-cat-list">
            <button
              className={`shop-cat-btn ${activeCategory === '' ? 'active' : ''}`}
              onClick={() => setCategory('')}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`shop-cat-btn ${activeCategory === cat.slug ? 'active' : ''}`}
                onClick={() => setCategory(cat.slug)}
              >
                {cat.name} <span className="count">{cat.count}</span>
              </button>
            ))}
          </div>

          <h3>Max Price</h3>
          <div className="shop-price-range">
            <input
              type="range"
              min="50"
              max="1000"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <div className="range-label">
              <span>₹50</span>
              <span>Up to ₹{maxPrice}</span>
            </div>
          </div>

          <button className="shop-clear-btn" onClick={clearFilters}>Clear All Filters</button>
        </aside>

        <div className="shop-main">
          <div className="filter-bar">
         <span className="result-count">
  <strong>{loading ? '…' : filtered.length}</strong> products found
  {searchQuery && <> for "<strong>{searchQuery.replace(/\+/g, ' ')}</strong>"</>}
  {ingredientFilter && <> containing "<strong>{ingredientFilter}</strong>"</>}
</span>

            <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center' }}>
              <button
                className="filter-mobile-toggle"
                onClick={() => setMobileFiltersOpen((o) => !o)}
              >
                {mobileFiltersOpen ? 'Hide Filters ✕' : 'Filters ☰'}
              </button>
              <div className="filter-sort">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="shop-product-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="product-card" style={{ opacity: 0.35 }} />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="shop-product-grid">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="shop-empty">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
