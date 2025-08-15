// src/components/Home/Category.jsx
import React from 'react';
import { Swiper, SwiperSlide }      from 'swiper/react';
import { Navigation, Autoplay }     from 'swiper/modules';

import { FaPlay }                   from 'react-icons/fa';
import { Link }                     from 'react-router-dom';
import Loader                       from '../Notfications/Loader';
import { Empty }                    from '../Notfications/Empty';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

export default function Category({ title,Icon,language, genre, movies = [], isLoading }) {


const filtered = movies.filter(m => {
    const okGenre    = genre    ? m.category === genre    : true;
    const okLanguage = language ? m.language === language : true;
    return okGenre && okLanguage;
  });
  return (
    <div className="my-16 px-4">
      <div className="flex items-center mb-4">
        {Icon && <Icon className="text-2xl text-subMain mr-2" />}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
     

      <div className="mt-8">
        {isLoading ? (
          <Loader />
        ) : filtered.length > 0 ? (
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            speed={800}
            loop={filtered.length > 5}
            breakpoints={{
              320:  { slidesPerView: 2, spaceBetween: 10 },
              640:  { slidesPerView: 3, spaceBetween: 15 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
              1280: { slidesPerView: 5, spaceBetween: 24 },
            }}
            className="overflow-visible"
          >
            {filtered.map(movie => (
              <SwiperSlide key={movie._id} className="overflow-visible">
                <div className="relative group cursor-pointer rounded-lg overflow-hidden">
                  {/* Poster */}
                  <img
                    src={movie.titleImage || '/images/user.png'}
                    alt={movie.name}
                    className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Overlay chỉ chứa title + play */}
                  <div
                    className="
                      absolute inset-0
                      bg-black bg-opacity-50
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-200
                      flex flex-col justify-center items-center
                      text-center px-4
                    "
                  >
                    <h3 className="text-white text-lg font-semibold mb-3 leading-snug">
                      {movie.name}
                    </h3>
                    <Link
                      to={`/movie/${movie._id}`}
                      onClick={e => e.stopPropagation()}
                      className="
                        inline-flex items-center
                        bg-white text-black
                        px-6 py-2
                        rounded-full
                        shadow-md
                        hover:bg-gray-200
                        transition
                      "
                    >
                      <FaPlay  />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Empty message={`Không tìm thấy phim thể loại "${genre}"`} />
        )}

        {/* Navigation arrows */}
      
      </div>
    </div>
  );
}
