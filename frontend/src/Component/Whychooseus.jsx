import { whyUs } from '../data/products.js'
import '../styles/WhyChooseUs.css'

export default function WhyChooseUs() {
  return (
    <section className="section bg-light">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">Our Promise</span>
          <h2>Why Choose Amrita?</h2>
          <p>We believe in nature's power to heal, nourish and transform your life</p>
        </div>
        <div className="why-grid">
          {whyUs.map((item, i) => (
            <div key={i} className="why-card">
              <div className="why-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}