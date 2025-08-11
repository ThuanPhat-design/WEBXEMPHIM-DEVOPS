import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { likeMovieAction } from "../Redux/Actions/userActions";
import { IoMdCloudDownload } from "react-icons/io";

import axios from "../Redux/APIs/Axios";
// Check if a movie is added to favorites
const IfMovieLiked = (movie) => {
  const { likedMovies = [] } = useSelector((state) => state.userGetFavoriteMovies || {});
  return likedMovies.find((likedMovie) => likedMovie?._id === movie?._id);
};

// Like movie functionality
const LikeMovie = (movie, dispatch, userInfo) => {
  return !userInfo
    ? toast.error("Please Login to add to favorites")
    : dispatch(
      likeMovieAction({
        movieId: movie._id,
      })
    );
};


const DownloadVideo = async (videoUrl, setprogress) => {
    const { data } = await axios({
      url: videoUrl,
      method: "GET",
      responseType: "blob", // Set the response type to blob for binary data
      timeout: 15000, // Set a 15-second timeout (adjust as needed)
      onDownloadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / total); // Calculate download percentage
        setprogress(percent);
        if (percent > 0 && percent < 100) {
          toast.loading(`Downloading... ${percent}%`, {
            id: "download",
            duration: 100000000, // Keep the toast visible
            position: "bottom-right",
            style: {
              background: "#0B0F29",
              color: "#fff",
              borderRadius: "10px",
              border: ".5px solid #F20000",
              padding: "16px",
            },
            icon: <IoMdCloudDownload className="text-2xl mr-2 text-subMain" />,
          });
        } else {
          toast.dismiss("download");
        }
      },
    });

    return data;
};






export { IfMovieLiked, LikeMovie, DownloadVideo };
