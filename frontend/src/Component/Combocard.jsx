import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { combos } from '../data/products.js'
import '../styles/ComboCard.css'

function ComboCard({ combo }) {
  return (
    <div className="combo-card">
      <div className="combo-save">{combo.save}</div>
      <div className="combo-imgs">
        <div className="combo-img-box">
          <img src={combo.img1} alt="" />
        </div>
        <span className="combo-plus">+</span>
        <div className="combo-img-box">
          <img src={combo.img2} alt="" />
        </div>
      </div>
      <h3>{combo.title}</h3>
      <p>{combo.desc}</p>
      <div className="combo-price">
        <span className="combo-new">{combo.newPrice}</span>
        <span className="combo-old">{combo.oldPrice}</span>
      </div>
      <Link to={`/shop?combo=${combo.id}`} className="btn btn-gold">Shop Now</Link>
    </div>
  )
}

export default function ComboSwiper() {
  return (
    <section className="section bg-light">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">Bundle &amp; Save</span>
          <h2>Combo Offers</h2>
          <p>Save more when you buy these powerful duos together</p>
        </div>
        <Swiper
          className="prod-swiper prod-swiper-eq"
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          grabCursor={true}
          loop={true}
          speed={900}
          autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640:  { slidesPerView: 2, spaceBetween: 22 },
            1024: { slidesPerView: 3, spaceBetween: 26 },
          }}
        >
          {combos.map(combo => (
            <SwiperSlide key={combo.id}>
              <ComboCard combo={combo} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}