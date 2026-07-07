import { Link } from 'react-router-dom'
import '../styles/Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="foot-grid">

          <div className="foot-brand">
            <Link to="/" className="foot-logo">Amrita<span>.</span></Link>
            <p>Premium Ayurvedic wellness, handcrafted from pure herbs. Rooted in tradition, crafted for today.</p>
            <div className="socials">
              <a href="#" aria-label="Instagram" className="soc-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="soc-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="soc-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="soc-link">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4>Shop</h4>
            <ul>
              <li><Link to="/shop">All Products</Link></li>
              <li><Link to="/shop?category=hair-care">Hair Care</Link></li>
              <li><Link to="/shop?category=immunity">Immunity</Link></li>
              <li><Link to="/shop?category=skin-care">Skincare</Link></li>
              <li><Link to="/shop?bestseller=true">Best Sellers</Link></li>
              <li><Link to="/shop?offer=true">Today's Offers</Link></li>
            </ul>
          </div>

          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/ingredients">Ingredients</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/profile">My Account</Link></li>
            </ul>
          </div>

          <div>
            <h4>Customer Care</h4>
            <ul>
              <li><Link to="/contact">FAQs</Link></li>
              <li><Link to="/contact">Shipping Policy</Link></li>
              <li><Link to="/contact">Returns & Refunds</Link></li>
              <li><Link to="/contact">Wholesale</Link></li>
              <li><Link to="/contact">Track Order</Link></li>
            </ul>
          </div>

        </div>

        <div className="foot-pay">
          <span>We Accept:</span>
          <div className="pay-icons">
            {['VISA','MC','UPI','Paytm','RuPay','NetBank'].map(p => (
              <span key={p} className="pay-badge">{p}</span>
            ))}
          </div>
        </div>

        <div className="foot-bottom">
          <span>© 2026 Amrita Ayurveda. All rights reserved.</span>
          <div className="foot-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}