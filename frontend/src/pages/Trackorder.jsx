import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import '../styles/pages/Checkout.css'
import '../styles/pages/TrackOrder.css'

const STAGES = ['Order Placed', 'Confirmed', 'Packed', 'Shipped', 'Out For Delivery', 'Delivered']

export default function TrackOrderPage() {
  const location = useLocation()
  const passedOrder = location.state?.order || null

  const [searchType, setSearchType] = useState('orderId')
  const [searchValue, setSearchValue] = useState('')
  const [order, setOrder] = useState(passedOrder)

  // Demo: in real app this would call an API. Here, a passed-in order
  // (from the success page) is shown directly; manual search re-uses it
  // if the ID matches, otherwise shows a "not found" state.
  const handleSearch = (e) => {
    e.preventDefault()
    if (passedOrder && searchValue.trim().toUpperCase() === passedOrder.id) {
      setOrder(passedOrder)
    } else if (!searchValue.trim()) {
      setOrder(passedOrder)
    } else {
      setOrder(null)
    }
  }

  // Demo current stage — order placed flow starts at stage 2 (Confirmed)
  const currentStageIndex = 1

  return (
    <section className="container track-order-page">
      <div className="track-hero">
        <h1>Track Your Order</h1>
        <p>Stay updated on your Ayurvedic essentials, every step of the way.</p>
      </div>

      <form className="track-search-card" onSubmit={handleSearch}>
        <div className="track-search-toggle">
          <button
            type="button"
            className={searchType === 'orderId' ? 'active' : ''}
            onClick={() => setSearchType('orderId')}
          >
            Order ID
          </button>
          <button
            type="button"
            className={searchType === 'mobile' ? 'active' : ''}
            onClick={() => setSearchType('mobile')}
          >
            Mobile Number
          </button>
        </div>
        <div className="track-search-row">
          <input
            placeholder={searchType === 'orderId' ? 'Enter Order ID (e.g. AYU123456)' : 'Enter Mobile Number'}
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
          />
          <button type="submit" className="btn btn-green ripple">Track</button>
        </div>
      </form>

      {!order && (
        <div className="track-empty">
          <span>🔍</span>
          <p>No order found. Please check the details and try again.</p>
        </div>
      )}

      {order && (
        <div className="track-result fade-in">
          <div className="track-order-card glass-card">
            <div className="track-order-head">
              <div>
                <span className="od-label">Order ID</span>
                <span className="od-value">{order.id}</span>
              </div>
              <div>
                <span className="od-label">Order Date</span>
                <span className="od-value">{order.date}</span>
              </div>
              <div>
                <span className="od-label">Payment Method</span>
                <span className="od-value" style={{ textTransform: 'capitalize' }}>{order.paymentMethod}</span>
              </div>
              <div>
                <span className="od-label">Shipping Partner</span>
                <span className="od-value">Amrita Express</span>
              </div>
              <div>
                <span className="od-label">Tracking Number</span>
                <span className="od-value">TRK{order.id.replace('AYU', '')}</span>
              </div>
            </div>

            <div className="track-countdown">
              🚚 Expected Delivery: <strong>{order.delivery}</strong>
            </div>

            {/* TIMELINE */}
            <div className="track-timeline">
              {STAGES.map((stage, i) => (
                <div
                  key={stage}
                  className={`track-stage ${i < currentStageIndex ? 'done' : ''} ${i === currentStageIndex ? 'current' : ''}`}
                >
                  <div className="track-dot">{i < currentStageIndex ? '✓' : i === currentStageIndex ? '●' : ''}</div>
                  <span className="track-stage-label">{stage}</span>
                </div>
              ))}
            </div>

            <div className="track-address-row">
              <div>
                <span className="od-label">Delivery Address</span>
                <p className="track-address-text">
                  {order.address?.name}, {order.address?.line1} {order.address?.line2},<br />
                  {order.address?.city}, {order.address?.state} - {order.address?.pincode}
                </p>
              </div>
            </div>

            <h4 style={{ marginTop: '1.5rem' }}>Ordered Products</h4>
            <div className="track-products">
              {order.items?.map(item => (
                <div className="track-product-item" key={item.id}>
                  <img src={item.image || '/placeholder-product.png'} alt={item.name} />
                  <div>
                    <div className="track-product-name">{item.name}</div>
                    <div className="track-product-qty">Qty: {item.qty} &nbsp;|&nbsp; ₹{item.price * item.qty}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="track-side">
            <div className="track-illustration glass-card">
              <div className="truck-anim">🚚</div>
              <p>Your order is on its way!</p>
            </div>

            <div className="checkout-summary-box glass-card">
              <h4>Need Help?</h4>
              <div className="help-row">📞 Customer Care: 1800-571-1751</div>
              <div className="help-row">💬 WhatsApp Support: +91 98765 43210</div>
              <div className="help-row">✉️ Email: support@amritaayurveda.com</div>
              <Link to="/shop" className="btn btn-outline" style={{ width: '100%', marginTop: '1rem' }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}