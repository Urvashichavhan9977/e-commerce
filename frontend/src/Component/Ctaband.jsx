import { Link } from 'react-router-dom'
import '../styles/CtaBand.css'

export default function CtaBand() {
  return (
    <section className="section-sm">
      <div className="container">
        <div className="cta-band">
          <div>
            <h2>Begin your wellness journey</h2>
            <p>Explore handcrafted Ayurvedic rituals for everyday balance.</p>
          </div>
          <Link to="/shop" className="btn btn-gold">Shop Now</Link>
        </div>
      </div>
    </section>
  )
}