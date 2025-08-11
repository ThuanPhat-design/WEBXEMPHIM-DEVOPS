import React, { useEffect, useMemo, useState } from "react";
import Layout from "../Layout/Layout";
import Filters from "../Components/Filters";
import Movie from "../Components/Movie";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import Loader from "../Components/Notfications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { getAllMoviesAction } from "../Redux/Actions/MoviesActions";
import { LanguageData, RatesData, TimesData, YearData } from "../Data/FilterData";
import { useParams } from "react-router-dom";

function MoviesPage() {
  const { search } = useParams();
  const dispatch = useDispatch();

  // --- Pagination state ---
  const [page, setPage] = useState(1);
  const pageSize = 30;

  // --- Filter states ---
  const [category, setCategory]   = useState({ title: "All Categories" });
  const [year, setYear]           = useState(YearData[0]);
  const [times, setTimes]         = useState(TimesData[0]);
  const [rates, setRates]         = useState(RatesData[0]);
  const [language, setLanguage]   = useState(LanguageData[0]);

  // --- Redux state ---
  const { isLoading, isError, movies = [] } = useSelector(
    (state) => state.getAllMovies
  );
  const { categories } = useSelector((state) => state.categoryGetAll);

  // --- Compute paged slice ---
  const moviesToShow = useMemo(() => {
    const start = (page - 1) * pageSize;
    return movies.slice(start, start + pageSize);
  }, [movies, page]);

  const totalPages = useMemo(
    () => Math.ceil(movies.length / pageSize),
    [movies]
  );

  // --- Build query (no pageNumber/pageSize for client-side) ---
  const queries = useMemo(() => ({
    category: category.title === "All Categories" ? "" : category.title,
    language: language.title === "Sort By Language"  ? "" : language.title,
    rate:     rates.title.replace(/\D/g, "") || "",
    search:   search || "",
  }), [category, language, rates, search]);

  // --- Fetch on filters change (one-time fetch all) ---
  useEffect(() => {
    if (isError) toast.error(isError);
    dispatch(getAllMoviesAction(queries));
    setPage(1); // reset về trang 1 khi filters/search thay đổi
  }, [dispatch, isError, queries]);

  // --- Handlers ---
  const nextPage = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };
  const prevPage = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  // --- Props cho Filters ---
  const filterProps = {
    categories, category, setCategory,
    language, setLanguage,
    rates, setRates,
    times, setTimes,
    year, setYear,
  };

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-8">
        <Filters data={filterProps} />

        {isLoading ? (
          <div className="w-full flex justify-center items-center min-h-screen">
            <Loader />
          </div>
        ) : movies.length > 0 ? (
          <>
            {/* Movie Grid */}
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              {moviesToShow.map((movie, idx) => (
                <Movie key={movie._id || idx} movie={movie} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="w-full flex justify-center items-center gap-4 my-10">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className="flex items-center px-5 py-2 bg-subMain text-white rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-subMain/90 transition"
              >
                <TbPlayerTrackPrev className="mr-2 text-lg" />
                Trang trước
              </button>

              <span className="text-white">
                Trang {page} / {totalPages}
              </span>

              <button
                onClick={nextPage}
                disabled={page === totalPages}
                className="flex items-center px-5 py-2 bg-subMain text-white rounded-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-subMain/90 transition"
              >
                Trang sau
                <TbPlayerTrackNext className="ml-2 text-lg" />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full min-h-[50vh] flex flex-col justify-center items-center gap-4">
            <div className="flex justify-center items-center w-32 h-32 rounded-full bg-gray-200 text-subMain text-5xl">
              <RiMovie2Line />
            </div>
            <h2 className="text-2xl font-semibold text-white">
              Oops! Không tìm thấy phim nào
            </h2>
            <p className="text-gray-400 text-center max-w-md">
              Rất tiếc, chúng tôi không thể tìm thấy bất kỳ bộ phim nào khớp với bộ lọc của bạn.
              Hãy thử thay đổi thể loại hoặc xóa bộ lọc tìm kiếm.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MoviesPage;
