import { instaImages } from '../data/products.js'
import '../styles/InstagramGrid.css'

export default function InstagramGrid() {
  return (
    <section className="section bg-light">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">@amrita.ayurveda</span>
          <h2>Instagram Gallery</h2>
          <p>Follow us for daily Ayurvedic rituals &amp; product inspiration</p>
        </div>
        <div className="insta-grid">
          {instaImages.map((item, i) => (
            <a key={i} href="#" className="insta-item">
              <img src={item.img} alt="" loading="lazy" />
              <div className="insta-ov">📷</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}