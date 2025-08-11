import React, { useState } from 'react';
import { BsBookmarkStarFill, BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Titles from '../Titles';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Rating from './Stars';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import Loader from '../Notfications/Loader';
import { Empty } from '../Notfications/Empty';
import { useDispatch, useSelector } from 'react-redux';
import { IfMovieLiked, LikeMovie } from '../../Context/Functionnalities';

const SwiperTop = ({ prevEl, nextEl, movies }) => {
    const { isLoading } = useSelector((state) => state.userLikeMovie)
    const dispatch = useDispatch()
    const userInfo = useSelector((state) => state.userLogin);

    // if like function
    const isLiked = (movie) => {
        return IfMovieLiked(movie)
    }
    return (
        <Swiper
            navigation={{ nextEl, prevEl }}
            autoplay={{ delay: 3000 }}
            speed={1000}
            //loop={true}
            modules={[Navigation, Autoplay]}
            breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 10 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
                1280: { slidesPerView: 4, spaceBetween: 40 },
            }}
        >
            {
                movies?.map((movie, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative group h-rate border border-border bg-dry rounded-lg overflow-hidden">
                            <img
                                src={movie.titleImage ? movie.titleImage : "/images/user.png"}
                                alt={movie?.name}
                                className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-500 flex flex-col justify-center items-center gap-4 px-4">
                                <button
                                    onClick={() => LikeMovie(movie, dispatch, userInfo)}
                                    disabled={isLiked(movie) || isLoading}
                                    className={`w-12 h-12 flex justify-center items-center rounded-full transition 
          ${isLiked(movie) ? "bg-subMain" : "bg-white bg-opacity-30 hover:bg-opacity-50"} 
          text-white`}
                                >
                                    <FaHeart />
                                </button>
                                <Link
                                    className="font-semibold text-xl text-white text-center truncate w-full"
                                    to={`/movie/${movie?._id}`}
                                >
                                    {movie?.name}
                                </Link>
                                <div className='flex justify-center gap-2 text-star'>
                                    <Rating value={movie?.rate} />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                ))
            }
        </Swiper>
    );
}

function TopRated({ movies, isLoading }) {
    const [nextEl, setNextEl] = useState(null);
    const [prevEl, setPrevEl] = useState(null);
    const classNames =
        'hover:br-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white '

    return (
        <div className='my-16 '>
            <Titles title='Top Rated' Icon={BsBookmarkStarFill} />
            <div className="mt-10">
                {
                    isLoading ? <Loader /> :
                        movies?.length > 0 ?
                            <SwiperTop nextEl={nextEl} prevEl={prevEl} movies={movies} />
                            :
                            <Empty message="It seems like we don't have any movies" />
                }
                <div className='W-full px-1 flex-rows gap-6 pt-12'>
                    <button className={classNames} ref={(node) => setPrevEl(node)}>
                        <BsCaretLeftFill />
                    </button>
                    <button className={classNames} ref={(node) => setNextEl(node)}>
                        <BsCaretRightFill />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TopRated;
