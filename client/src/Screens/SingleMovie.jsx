import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from "../Layout/Layout";
import MovieInfo from '../Components/Single/MovieInfo';
import MovieCasts from '../Components/Single/MovieCasts';
import MovieRates from '../Components/Single/MovieRates';
import Titles from '../Components/Titles';
import Movie from '../Components/Movie';
import { BsCollectionFill } from 'react-icons/bs';
import ShareMovieModal from '../Components/Modals/ShareModal';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieByIdAction } from '../Redux/Actions/MoviesActions';
import Loader from '../Components/Notfications/Loader';
import { RiMovie2Line } from 'react-icons/ri';
import { SidebarContext } from '../Context/DrawerContext';
import FileSaver from 'file-saver';
import { DownloadVideo } from '../Context/Functionnalities';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

function SingleMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const { progress, setprogress } = useContext(SidebarContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const sameClass = "w-full gap-6 flex-colo min-h-hscreen";

  // Redux selectors
  const { isLoading, isError, movie } = useSelector(state => state.getMovieById);
  const { movies = [] } = useSelector(state => state.getAllMovies);

  // Filter related by category
  const RelatedMovies = useMemo(
    () => movies.filter(m => m.category === movie?.category),
    [movies, movie]
  );

  // Download handler
  const DownloadMovieVideo = async (videoUrl, name) => {
    await DownloadVideo(videoUrl, setprogress).then(data => {
      setprogress(0);
      FileSaver.saveAs(data, name);
    });
  };

  // Fetch movie details
  useEffect(() => {
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <Layout>
        <div className={sameClass}>
          <Loader />
        </div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">Something went wrong</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ShareMovieModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        movie={movie}
      />

      <MovieInfo
        movie={movie}
        setModalOpen={setModalOpen}
        DownloadMovieVideo={DownloadMovieVideo}
        progress={progress}
      />

      <div className="container mx-auto min-h-screen px-2 my-6">
        <MovieCasts movie={movie} />
        <MovieRates movie={movie} />

        {RelatedMovies.length > 0 && (
          <div className="my-16">
            <Titles title="Related Movies" Icon={BsCollectionFill} />

            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={16}
              slidesPerView={2}
              navigation
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                640:  { slidesPerView: 2, spaceBetween: 16 },
                768:  { slidesPerView: 3, spaceBetween: 20 },
                1024: { slidesPerView: 4, spaceBetween: 24 },
                1280: { slidesPerView: 5, spaceBetween: 28 },
              }}
            >
              {RelatedMovies.map((rel) => (
                <SwiperSlide key={rel._id}>
                  <Movie movie={rel} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default SingleMovie;
