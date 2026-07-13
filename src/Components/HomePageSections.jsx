import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa' // استيراد الأسهم المخصصة
import GameCard from './GameCard'
import 'swiper/css'
import 'swiper/css/navigation'

export default function HomePageSections({ title, games }) {
  if (!games || games.length === 0) {
    return null
  }

  // توليد كلاسات فريدة لكل قسم بناءً على العنوان لتجنب تداخل حركة الأسهم بين السكاشن
  const sectionId = title.replace(/\s+/g, '-').toLowerCase()

  return (
    <section className="relative mb-14 text-left group">
      {/* عنوان القسم بتنسيق عريض ومكثف متناسق مع نمط الـ Hero */}
      <div className="mb-6 flex items-baseline justify-between px-2">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-white sm:text-3xl font-sans">
          {title}
        </h2>
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Swipe to explore
        </span>
      </div>

      {/* منطقة السلايدر والأسهم */}
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          // ربط الأسهم المخصصة للسكشن الحالي
          navigation={{
            nextEl: `.btn-next-${sectionId}`,
            prevEl: `.btn-prev-${sectionId}`,
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 1.5 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="overflow-visible"
        >
          {games.map((game) => (
            <SwiperSlide key={game.id} className="transition-transform duration-300 hover:scale-[1.02]">
              <GameCard game={game} />
            </SwiperSlide>
          ))}
        </Swiper>


        <button className={`btn-prev-${sectionId} absolute -left-4 top-1/2 z-20 -translate-y-1/2 flex h-16 w-9 items-center justify-center rounded-[1rem] bg-neutral-900/50 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer border border-white/5 shadow-xl`}>
          <FaChevronLeft size={12} />
        </button>
        <button className={`btn-next-${sectionId} absolute -right-4 top-1/2 z-20 -translate-y-1/2 flex h-16 w-9 items-center justify-center rounded-[1rem] bg-neutral-900/50 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer border border-white/5 shadow-xl`}>
          <FaChevronRight size={12} />
        </button>
      </div>
    </section>
  )
}