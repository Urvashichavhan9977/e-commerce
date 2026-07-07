import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import ProductCard from '../Component/Productcard.jsx'
import '../styles/pages/Profile.css'

const TABS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'orders', label: 'Orders' },
  { id: 'wishlist', label: 'Wishlist' },
  { id: 'addresses', label: 'Addresses' },
  { id: 'profile', label: 'Profile' },
  { id: 'password', label: 'Password' },
]

export default function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth()
  const { wishlist, cart } = useCart()
  const [tab, setTab] = useState('dashboard')
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!isAuthenticated) {
    return (
      <section className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--green)', marginBottom: '.75rem' }}>You're not signed in</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
          Sign in to view your dashboard, orders, wishlist and saved addresses.
        </p>
        <Link to="/login" className="btn btn-green">Sign In</Link>
      </section>
    )
  }

  return (
    <section className="container profile-page">
      <div className="sec-head" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
        <h2 style={{ marginBottom: '.2rem' }}>Hi, {user?.name || 'there'} 👋</h2>
        <p style={{ margin: 0 }}>{user?.email}</p>
      </div>

      <div className="profile-tabs">
        {TABS.map(t => (
          <button key={t.id} className={tab === t.id ? 'active' : ''} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="profile-content">
        {tab === 'dashboard' && (
          <>
            <h2>Account Overview</h2>
            <div className="dashboard-grid">
              <div className="dash-stat">
                <span className="num">0</span>
                <span className="label">Orders Placed</span>
              </div>
              <div className="dash-stat">
                <span className="num">{wishlist.length}</span>
                <span className="label">Wishlist Items</span>
              </div>
              <div className="dash-stat">
                <span className="num">{cart.length}</span>
                <span className="label">Items in Cart</span>
              </div>
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '.88rem' }}>
              Welcome back! Use the tabs above to track orders, manage your wishlist, update saved
              addresses or change your password.
            </p>
          </>
        )}

        {tab === 'orders' && (
          <>
            <h2>Your Orders</h2>
            <div className="profile-empty">
              <p>You haven't placed any orders yet.</p>
              <Link to="/shop" className="btn btn-green" style={{ marginTop: '1rem' }}>Start Shopping</Link>
            </div>
          </>
        )}

        {tab === 'wishlist' && (
          <>
            <h2>Your Wishlist</h2>
            {wishlist.length === 0 ? (
              <div className="profile-empty">
                <p>Your wishlist is empty. Tap the heart icon on any product to save it here.</p>
                <Link to="/shop" className="btn btn-green" style={{ marginTop: '1rem' }}>Browse Products</Link>
              </div>
            ) : (
              <div className="wishlist-grid">
                {wishlist.map(item => (
                  <ProductCard key={item.id} product={{ ...item, priceLabel: `₹${item.price}` }} showQuick={false} />
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'addresses' && (
          <>
            <h2>Saved Addresses</h2>
            <div className="profile-empty">
              <p>You don't have any saved addresses yet. Add one at checkout to save it here.</p>
              <Link to="/checkout" className="btn btn-green" style={{ marginTop: '1rem' }}>Add Address at Checkout</Link>
            </div>
          </>
        )}

        {tab === 'profile' && (
          <>
            <h2>Profile Details</h2>
            <div className="profile-form">
              <div className="field">
                <label>Full Name</label>
                <input defaultValue={user?.name || ''} />
              </div>
              <div className="field">
                <label>Email</label>
                <input defaultValue={user?.email || ''} type="email" />
              </div>
              <div className="field">
                <label>Phone</label>
                <input placeholder="+91 98765 43210" />
              </div>
              <button className="btn btn-green">Save Changes</button>
            </div>
          </>
        )}

        {tab === 'password' && (
          <>
            <h2>Change Password</h2>
            <div className="profile-form">
              <div className="field">
                <label>Current Password</label>
                <input type="password" />
              </div>
              <div className="field">
                <label>New Password</label>
                <input type="password" minLength={6} />
              </div>
              <button className="btn btn-green">Update Password</button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
