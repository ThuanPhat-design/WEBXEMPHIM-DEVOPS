import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import PopularMovies from '../Components/Home/PopularMovies';
import Banner from '../Components/Home/Banner';
import TopRated from '../Components/Home/TopRated';
import Category from '../Components/Home/CategorizeMovies';
import movieSections from '../Components/Config/movieSections';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMoviesAction, getRandomMoviesAction, getTopRatedMovieAction } from '../Redux/Actions/MoviesActions';
import toast from 'react-hot-toast';

function HomeScreen() {
    const dispatch = useDispatch();

    // useSelectors
    const { isLoading: randomLoading, isError: randomError, movies: randomMovies } = useSelector(
        (state) => state.getRandomMovies
    );
    const { isLoading: topLoading, isError: topError, movies: topMovies } = useSelector(
        (state) => state.getTopRatedMovie
    );
    const { isLoading, isError, movies } = useSelector(
        (state) => state.getAllMovies
    );

    // useEffect
    useEffect(() => {
        // Lấy danh sách phim ngẫu nhiên
        dispatch(getRandomMoviesAction());
        // Lấy tất cả phim
        dispatch(getAllMoviesAction({}));
        // Lấy phim có đánh giá cao nhất
        dispatch(getTopRatedMovieAction());

        // Xử lý lỗi
        if (isError || randomError || topError) {
            toast.error("Something went wrong!");
        }
    }, [dispatch, isError, randomError, topError]);

    // Kiểm tra dữ liệu phim có chứa category hay không
    useEffect(() => {
        if (movies && Array.isArray(movies)) {
            console.log("Movies loaded:", movies);
            movies.forEach((movie) => {
                if (!movie?.category) {
                    console.warn("Movie without category:", movie);
                }
            });
        }
    }, [movies]);

    return (
        <Layout>
            <div className="container mx-auto min-h-screen px-2 mb-6 bg-dry text-white">
                <Banner movies={movies} isLoading={isLoading} />
                <PopularMovies movies={randomMovies} isLoading={randomLoading} />
                {movieSections.map(({ key, title, genre, icon: Icon }) => (
                    <Category
                        key={key}
                        title={title}
                        genre={genre}
                        Icon={Icon}           // <-- thêm đây
                        movies={movies}
                        isLoading={isLoading}
                    />
                ))}

                <TopRated movies={topMovies} isLoading={topLoading} />
            </div>
        </Layout>
    );
}

export default HomeScreen;
