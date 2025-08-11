import React, { useContext, useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { useParams, Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { FaCloudDownloadAlt, FaHeart, FaPlay } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieByIdAction } from '../Redux/Actions/MoviesActions';
import Loader from '../Components/Notfications/Loader';
import { RiMovie2Line } from 'react-icons/ri';
import { DownloadVideo, IfMovieLiked, LikeMovie } from '../Context/Functionnalities';
import { SidebarContext } from '../Context/DrawerContext';
import FileSaver from 'file-saver';

function WatchPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [play, setPlay] = useState(false);
    const { progress, setprogress } = useContext(SidebarContext);

    const sameClass = "w-full gap-6 flex-colo min-h-hscreen";

    // user Selector
    const { isLoading, isError, movie } = useSelector(
        (state) => state.getMovieById
    );
    const { isLoading: likeLoading } = useSelector((state) => state.userLikeMovie);
    const userInfo = useSelector((state) => state.userLogin);

    // check if user liked movie
    const isLiked = (movie) => IfMovieLiked(movie);

    const DownloadMovieVideo = async (videoUrl, name) => {
        await DownloadVideo(videoUrl, setprogress).then((data) => {
            setprogress(0);
            FileSaver.saveAs(data, name);
        });
    };

    // Fetch movie details
    useEffect(() => {
        dispatch(getMovieByIdAction(id));
    }, [dispatch, id]);

    return (
        <Layout>
            <div className="container mx-auto bg-dry p-6 mb-12">
                {!isError && (
                    <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
                        <Link
                            to={`/movie/${movie?._id}`}
                            className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
                        >
                            <BiArrowBack /> {movie?.name}
                        </Link>
                        <div className="flex-btn sm:w-auto w-full gap-5">
                            <button
                                onClick={() => LikeMovie(movie, dispatch, userInfo)}
                                disabled={isLiked(movie) || likeLoading}
                                className={`bg-white hover:text-subMain 
                  ${isLiked(movie) ? "text-subMain" : "text-white"}
                  transitions bg-opacity-30 rounded px-4 py-3 text-sm`}
                            >
                                <FaHeart />
                            </button>
                            <button
                                disabled={progress > 0 && progress < 100}
                                onClick={() => DownloadMovieVideo(movie?.video, movie?.name)}
                                className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-8 font-medium py-3 text-sm"
                            >
                                <FaCloudDownloadAlt /> Download
                            </button>
                        </div>
                    </div>
                )}

                {/* Watch video or poster */}
                {play ? (
                      <div className="w-full flex justify-center">
                      <div className="w-full max-w-900px h-[500px] rounded overflow-hidden shadow-lg">
                        <iframe
                          src={`${movie?.video}?autoplay=1&modestbranding=1&rel=0&controls=1&rel=1`}
                          title={movie?.name}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                    </div>

                ) : (
                    <div className="w-full h-screen rounded-lg overflow-hidden relative">
                        {isLoading ? (
                            <div className={sameClass}>
                                <Loader />
                            </div>
                        ) : isError ? (
                            <div className={sameClass}>
                                <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
                                    <RiMovie2Line />
                                    <p className="text-border text-sm">{isError}</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
                                    <button
                                        onClick={() => setPlay(true)}
                                        className="bg-white hover:text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl"
                                    >
                                        <FaPlay />
                                    </button>
                                </div>
                                <img
                                    src={movie?.image ? `${movie?.image}` : "/images/user.png"}
                                    alt={movie?.name}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default WatchPage;
