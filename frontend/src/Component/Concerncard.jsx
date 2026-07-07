import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { concerns, ingredients } from '../data/products.js'
import '../styles/ConcernCard.css'

function ConcernCard({ item, link }) {
  return (
    <Link to={link} className="concern-card">
      <div className="concern-img">
        <img src={item.img} alt={item.name} loading="lazy" />
      </div>
      <div className="concern-body">
        <h3>{item.name}</h3>
        <span>{item.herbs || item.benefits}</span>
      </div>
    </Link>
  )
}

export function ConcernSwiper() {
  return (
    <section className="section">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">Personalized</span>
          <h2>Shop by Concern</h2>
          <p>Find the exact remedy your body needs — naturally</p>
        </div>
        <Swiper
          className="prod-swiper"
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1.15}
          spaceBetween={16}
          grabCursor={true}
          autoplay={{ delay: 3800, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            480:  { slidesPerView: 2.1, spaceBetween: 16 },
            768:  { slidesPerView: 3,   spaceBetween: 20 },
            1024: { slidesPerView: 4,   spaceBetween: 24 },
          }}
        >
          {concerns.map(item => (
            <SwiperSlide key={item.id}>
              <ConcernCard item={item} link={`/shop?concern=${item.name.toLowerCase().replace(/ /g, '-')}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export function IngredientSwiper() {
  return (
    <section className="section bg-light">
      <div className="container">
        <div className="sec-head">
          <span className="eyebrow">Nature's Pharmacy</span>
          <h2>Shop by Ingredient</h2>
          <p>Know what goes in — shop by nature's finest healing herbs</p>
        </div>
        <Swiper
          className="prod-swiper"
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1.15}
          spaceBetween={16}
          grabCursor={true}
          autoplay={{ delay: 3600, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            480:  { slidesPerView: 2.1, spaceBetween: 16 },
            768:  { slidesPerView: 3,   spaceBetween: 20 },
            1024: { slidesPerView: 4,   spaceBetween: 24 },
          }}
        >
          {ingredients.map(item => (
            <SwiperSlide key={item.id}>
              <ConcernCard item={item} link={`/shop?ingredient=${item.slug}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
