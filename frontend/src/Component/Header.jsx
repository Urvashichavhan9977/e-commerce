import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import BlogDrawer from './BlogDrawer.jsx'
import MegaMenu from './MegaMenu.jsx'
import '../styles/Header.css'

export default function Header() {
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [blogOpen, setBlogOpen] = useState(false)
  const [shopMenuOpen, setShopMenuOpen] = useState(false)     // desktop hover
  const [mobileShopOpen, setMobileShopOpen] = useState(false) // mobile accordion
  const { cartCount, wishlist, isWished } = useCart()
  const navigate = useNavigate()

  // Small close-delay so moving the cursor from "Shop" down into the panel
  // never closes the menu mid-way — it only closes if the mouse truly leaves.
  const closeTimer = useRef(null)

  const openShopMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setShopMenuOpen(true)
  }

  const scheduleCloseShopMenu = () => {
    closeTimer.current = setTimeout(() => setShopMenuOpen(false), 200)
  }

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    setShopMenuOpen(false)
    setMobileShopOpen(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`)
      setQuery('')
      closeMenu()
    }
  }

  const openBlog = () => {
    setBlogOpen(true)
    closeMenu()
  }

  const shopMenuIsOpen = shopMenuOpen || mobileShopOpen

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo" onClick={closeMenu}>
          Amrita<span>.</span>
        </Link>

        <nav className={`header-nav-wrap ${menuOpen ? 'open' : ''}`}>
          <ul className="header-nav">
            <li><NavLink to="/" end onClick={closeMenu}>Home</NavLink></li>

            {/* --- Shop item with Mega Menu --- */}
            <li
              className="header-nav-item-mega"
              onMouseEnter={openShopMenu}
              onMouseLeave={scheduleCloseShopMenu}
            >
              <div className="header-shop-trigger">
                <NavLink to="/shop" onClick={closeMenu}>Shop</NavLink>
                <button
                  type="button"
                  className="header-shop-caret"
                  aria-label="Toggle shop menu"
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileShopOpen((o) => !o)
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>

              {/* Panel is always mounted so it can animate open/close smoothly
                  (fade on desktop, slide-down on mobile) and so there's no
                  dead gap in the hover zone between the trigger and the panel. */}
              <div className={`mega-menu-panel ${shopMenuIsOpen ? 'is-open' : ''}`}>
                <div className="mega-menu-card">
                  <MegaMenu onNavigate={closeMenu} />
                </div>
              </div>
            </li>

            <li><NavLink to="/ingredients" onClick={closeMenu}>Ingredients</NavLink></li>
            <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
            <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
            <li>
              <button type="button" className="header-blog-link" onClick={openBlog}>
                Our Blog
              </button>
            </li>
          </ul>

          <form className="header-search header-search-mobile" onSubmit={handleSearch}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search products…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </form>

          <div className="header-mobile-links">
            <Link to="/profile" onClick={closeMenu}>My Account</Link>
            <Link to="/wishlist" onClick={closeMenu}>Wishlist {wishlist.length > 0 && `(${wishlist.length})`}</Link>
            <Link to="/cart" onClick={closeMenu}>Cart {cartCount > 0 && `(${cartCount})`}</Link>
          </div>
        </nav>

        <div className="header-right">
          <form className="header-search" onSubmit={handleSearch}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search products…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </form>

          <Link to="/profile" className="header-icon-btn" aria-label="Account">👤</Link>

          <Link to="/wishlist" className="header-icon-btn header-wishlist-btn" aria-label="Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill={isWished ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {wishlist.length > 0 && <span className="header-wishlist-count">{wishlist.length}</span>}
          </Link>

          <Link to="/cart" className="header-icon-btn" aria-label="Cart">
            🛒
            {cartCount > 0 && <span className="header-cart-count">{cartCount}</span>}
          </Link>

          <button
            className="header-mobile-toggle"
            aria-label="Menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      <BlogDrawer open={blogOpen} onClose={() => setBlogOpen(false)} />
    </header>
  )
}