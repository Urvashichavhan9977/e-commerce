import { Link } from 'react-router-dom'
import { essentials } from '../data/products.js'
import '../styles/EssentialsGrid.css'

export default function EssentialsGrid() {
  return (
    <section className="section bg-light">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">Shop by Need</span>
          <h2>Daily Essentials</h2>
          <p>Curated collections for every wellness need</p>
        </div>
        <div className="essentials-grid">
          {essentials.map(item => (
            <Link key={item.id} to={item.link} className="ess-card">
              <div className="ess-bg" style={{ backgroundImage: `url('${item.bg}')` }} />
              <div className="ess-overlay" style={{ background: item.overlay }} />
              <div className="ess-content">
                <span className="ess-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span className="ess-cta">Shop Now →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}