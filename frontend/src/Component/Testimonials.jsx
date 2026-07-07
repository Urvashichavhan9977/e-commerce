import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { testimonials } from '../data/products.js'
import '../styles/Testimonials.css'

export default function Testimonials() {
  return (
    <section className="testi-section" aria-label="Testimonials">
      <div className="testi-orb o1" />
      <div className="testi-orb o2" />
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow" style={{ color: 'var(--gold2)' }}>Real Stories</span>
          <h2 style={{ color: '#fff' }}>What Our Customers Say</h2>
          <p style={{ color: 'rgba(255,255,255,.6)' }}>Trusted by 50,000+ happy customers across India</p>
        </div>
        <Swiper
          className="prod-swiper testi-swiper"
          modules={[Autoplay, Pagination]}
          loop={true}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          speed={750}
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          breakpoints={{
            768:  { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
        >
          {testimonials.map(t => (
            <SwiperSlide key={t.id}>
              <div className="testi-card">
                <div className="testi-stars">★★★★★</div>
                <p className="testi-quote">"{t.quote}"</p>
                <div className="testi-author">
                  <div className="testi-av">{t.initials}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <small>{t.location} • Verified Buyer</small>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}