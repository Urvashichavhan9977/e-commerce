import { Link } from 'react-router-dom'
import '../styles/BrandStory.css'

const AMRITA_VIDEO_URL = 'herbs.mp4'

export default function BrandStory() {
  return (
    <section className="section">
      <div className="container story-grid">
        <div className="story-video">
          <iframe
            src={AMRITA_VIDEO_URL}
            title="Amrita Brand Story"
            allowFullScreen
            allow="autoplay"
            loading="lazy"
          />
        </div>
        <div className="story-text">
          <span className="eyebrow">Brand Story</span>
          <h2>From Himalayan kitchens to your shelf</h2>
          <p>Amrita began where remedies were prepared by hand, passed through generations. We carry that devotion into every jar.</p>
          <p>Partnering with organic farmers, we source rare herbs at peak potency — never diluted, never rushed.</p>
          <div className="pill-tags">
            {['Family Recipes', 'Small Batch', 'Farmer Partnered', 'Plastic-Free'].map(tag => (
              <span key={tag} className="pill-tag">{tag}</span>
            ))}
          </div>
          <Link to="/about" className="btn btn-green">Our Full Story</Link>
        </div>
      </div>
    </section>
  )
}