import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import HomePageSections from '../Components/HomePageSections'
import {
  getFeaturedGames,
  getUpcomingGames,
  getTrendingGames,
  getTopRatedGames,
  getPopularGames,
} from '../api/rawg'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function HomePage() {
  const [featuredGames, setFeaturedGames] = useState([])
  const [upcomingGames, setUpcomingGames] = useState([])
  const [trendingGames, setTrendingGames] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const [bestDeals, setBestDeals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [featured, upcoming, trending, sellers, deals] = await Promise.all([
          getFeaturedGames(),
          getUpcomingGames(),
          getTrendingGames(),
          getTopRatedGames(),
          getPopularGames(),
        ])

        setFeaturedGames(featured)
        setUpcomingGames(upcoming)
        setTrendingGames(trending)
        setBestSellers(sellers)
        setBestDeals(deals)
      } catch (error) {
        console.error('Failed to load homepage data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"></div>
          <p className="text-lg">Loading games...</p>
        </div>
      </div>
    )
  }

  const heroSlides = trendingGames

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Hero slider section */}
        <section className="relative mb-12 group">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            // ربط الأسهم المخصصة بـ Swiper لكي تعمل عند الضغط
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={false}
            spaceBetween={20}
            slidesPerView={1}
            className="rounded-3xl overflow-hidden"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="relative overflow-hidden h-[550px] w-full rounded-3xl bg-slate-900">
                  {/* خلفية الصورة اللعبة */}
                  {slide.background_image ? (
                    <img
                      src={slide.background_image}
                      alt={slide.name}
                      loading="eager"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700 px-6 text-center">
                      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">
                        No image
                      </p>
                      <h2 className="text-3xl font-bold text-white sm:text-4xl">{slide.name}</h2>
                    </div>
                  )}
                  {/* الظلال الجانبية المتطابقة مع الصورة */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* محتوى السلايدر */}
                  <div className="absolute inset-0 p-8 md:p-16 flex flex-col md:flex-row md:justify-between md:items-end gap-12 z-10">
                    
                    {/* الجانب الأيسر: النصوص */}
                    <div className="max-w-xl text-left md:max-w-2xl">
                      <h1 className="mb-4 text-5xl font-black uppercase tracking-tighter text-white leading-[0.95] sm:text-6xl md:text-7xl font-sans max-w-md">
                        {slide.name}
                      </h1>
                      <p className="mb-6 text-sm md:text-base text-gray-300 font-normal leading-relaxed max-w-lg opacity-90">
                        {slide.description_raw || 'Five years after the events of The Last of Us, Ellie embarks on another journey through a post-apocalyptic America on a mission of vengeance against a mysterious militia.'}
                      </p>
                    </div>

                    {/* الجانب الأيمن: السعر والأزرار */}
                    <div className="flex flex-col items-stretch md:items-end gap-3 min-w-[240px]">
                      {/* السعر فوق الأزرار مباشرة */}
                      <span className="text-gray-300 font-medium text-sm md:text-base px-2 md:text-right">
                        ${slide.price || '49.99'}
                      </span>
                      
                      <button className="w-full md:w-56 rounded-full bg-white py-3 px-8 font-bold text-slate-950 transition hover:bg-gray-200 text-center text-sm tracking-wide shadow-lg">
                        Buy Now
                      </button>
                      
                      <button className="w-full md:w-56 rounded-full border border-gray-600 bg-transparent py-3 px-8 font-medium text-white transition hover:bg-white/10 text-center text-sm tracking-wide">
                        Add to Wishlist
                      </button>
                    </div>

                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* أزرار التنقل الجانبية المخصصة (مطابقة تماماً للصورة من حيث الشكل والشفافية والتأثير الضبابي) */}
          <button className="swiper-button-prev-custom absolute left-6 top-1/2 z-20 -translate-y-1/2 flex h-24 w-11 items-center justify-center rounded-[1.5rem] bg-neutral-900/40 text-white backdrop-blur-md transition hover:bg-neutral-900/70 cursor-pointer border border-white/5">
            <FaChevronLeft size={16} />
          </button>
          <button className="swiper-button-next-custom absolute right-6 top-1/2 z-20 -translate-y-1/2 flex h-24 w-11 items-center justify-center rounded-[1.5rem] bg-neutral-900/40 text-white backdrop-blur-md transition hover:bg-neutral-900/70 cursor-pointer border border-white/5">
            <FaChevronRight size={16} />
          </button>
        </section>

        {/* باقي السكاشن */}
        <HomePageSections title="Upcoming Games" games={upcomingGames} />
        <HomePageSections title="Trending Games" games={trendingGames} />
        <HomePageSections title="Best Sellers" games={bestSellers} />
        <HomePageSections title="Best Deals" games={bestDeals} />
      </div>
    </div>
  )
}