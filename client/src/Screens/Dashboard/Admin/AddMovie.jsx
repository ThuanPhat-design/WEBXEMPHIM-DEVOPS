// src/pages/AddMovie.jsx
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideBar from "../SideBar";
import { Input, Select, ControlledTextarea } from "../../../Components/UsedInputs";
import Uploder from "../../../Components/Uploder";
import CastsModal from "../../../Components/Modals/CastsModal";
import { ImagePreview } from "../../../Components/ImagePreview";
import { createMovieAction, removeCastAction } from "../../../Redux/Actions/MoviesActions";
import { yupResolver } from "@hookform/resolvers/yup";
import { movieValidation } from "../../../Components/Validation/MovieValidation";
import { InlineError } from "../../../Components/Notfications/Error";
import { ImUpload } from "react-icons/im";
import useTmdbAutoFill from "../../../Components/Autofill.jsx";
import { FaPen, FaPenNib } from "react-icons/fa";

export default function AddMovie() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories = [] } = useSelector(s => s.categoryGetAll);
  const { casts: manualCasts = [] } = useSelector(s => s.casts);
  const { isLoading, isError, isSuccess } = useSelector(s => s.createMovie);

  const { control, handleSubmit, setValue, watch, formState: { errors }, reset } =
    useForm({
      resolver: yupResolver(movieValidation),
      defaultValues: {
        name: "", time: "", language: "", year: "", desc: "", category: "", poster: ""
      }
    });

  // UI state
  const [modalOpen, setModalOpen] = useState(false);
  const [castEdit, setCastEdit] = useState(null);
  const [imageWithoutTitle, setImageWithoutTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [autoCasts, setAutoCasts] = useState([]);

  // Autofill từ TMDB, nhận về poster và autoCasts
  const { handleAutoFill, isFilling } = useTmdbAutoFill({
    watch,
    setValue,
    categories,
    apiUrl: "http://localhost:5000/api/movies/tmdb-fill",
    setPosterMain: setImageWithoutTitle,
    setPosterTitle: setImageTitle,  // gán poster luôn vào imageWithoutTitle
    setCasts: setAutoCasts,            // gán cast tự động
  });

  // Submit form
  const allCasts = [...autoCasts, ...manualCasts];
  const onSubmit = data => {
    dispatch(createMovieAction({
      ...data,
      image: imageWithoutTitle,
      titleImage: imageTitle,
      video: videoUrl,
      casts: allCasts
    }));
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      setImageWithoutTitle("");
      setImageTitle("");
      setVideoUrl("");
      setAutoCasts([]);
      dispatch({ type: "CREATE_MOVIE_RESET" });
      toast.success("Đăng phim thành công");
      navigate("/addMovie");
    }
    if (isError) {
      toast.error("Có lỗi xảy ra");
      dispatch({ type: "CREATE_MOVIE_RESET" });
    }
  }, [isSuccess, isError, dispatch, reset, navigate]);

  // validate video URL
  const isValidUrl = url =>
    /^(https?:\/\/)?(www\.)?([A-Za-z0-9\-_]+\.)+[A-Za-z]{2,}\/?.*/.test(url);

  // Kết hợp autoCasts + manualCasts

  return (
    <SideBar>
      <CastsModal modalOpen={modalOpen} setModalOpen={setModalOpen} cast={castEdit} />

      <div className="p-6 space-y-6">
        <h2 className="text-xl font-bold">Thêm phim</h2>

        {/* Tên + Autofill */}
        <div className="relative">
          {/* Input chiếm hết chiều rộng */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="Gia tài của ngoại"
                bg
                className="w-full pr-12"    /* thêm padding phải để không bị đè lên chữ */
                {...field}
              />
            )}
          />
          {/* Button tròn đỏ được đặt absolute */}
          <button
            type="button"
            onClick={handleAutoFill}
            disabled={!watch("name") || isFilling}
            className="
        absolute right-3 top-1/2
        w-10 h-10
        -translate-y-1/2
        bg-red-500 hover:bg-red-600
        text-white
        rounded-full
        disabled:opacity-50 disabled:cursor-not-allowed
        transition
        flex items-center justify-center
      "
          >
            {isFilling
              ? <FaPenNib className="animate-spin text-lg" />
              : <FaPen className="text-lg" />
            }
          </button>
        </div>



        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Thời lượng + Ngôn ngữ */}
          <div className="grid md:grid-cols-2 gap-6">
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <Input label="Thời lượng (phút)" placeholder="120" type="number" bg {...field} />
              )}
            />
            {errors.time && <InlineError text={errors.time.message} />}

            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <Input label="Ngôn ngữ" placeholder="English" bg {...field} />
              )}
            />
            {errors.language && <InlineError text={errors.language.message} />}
          </div>

          {/* Năm phát hành + Thể loại */}
          <div className="grid md:grid-cols-2 gap-6">
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <Input label="Năm phát hành" placeholder="2022" type="number" bg {...field} />
              )}
            />
            {errors.year && <InlineError text={errors.year.message} />}

            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select label="Thể loại chính" options={categories} {...field} />
              )}
            />
            {errors.category && <InlineError text={errors.category.message} />}
          </div>

          {/* Mô tả */}
          <Controller
            name="desc"
            control={control}
            render={({ field }) => (
              <ControlledTextarea label="Mô tả" placeholder="Nội dung phim..." {...field} />
            )}
          />
          {errors.desc && <InlineError text={errors.desc.message} />}

          {/* Hình ảnh (poster) */}
          
            <div className='w-full grid md:grid-cols-2 gap-6'>
                                {/*img without title */}
            <div className='flex flex-colo gap-2'>
              <p className='text-border font-semibold text-sm'>
                Hình không có tiêu đề
              </p>
              <Uploder setImageUrl={setImageWithoutTitle} />
              <ImagePreview image={imageWithoutTitle} name="imageWithoutTitle" />
            </div>
            {/*img without title */}
            <div className='flex flex-colo gap-2'>
              <p className='text-border font-semibold text-sm'>
                Hình có tiêu đề
              </p>
              <Uploder setImageUrl={setImageTitle} />
              <ImagePreview image={imageTitle} name="imageTitle" />
            </div>
          </div>


          {/* Link Video */}
          <div>
            <label className="block font-medium mb-1">Link nhúng video</label>
            <Input placeholder="https://..." bg value={videoUrl} onChange={e => setVideoUrl(e.target.value)} />
            {videoUrl && (
              isValidUrl(videoUrl)
                ? <iframe src={videoUrl} title="Video Preview" className="w-full h-64 rounded mt-2" allowFullScreen />
                : <p className="text-red-600 text-sm mt-2">❌ Link video không hợp lệ.</p>
            )}
          </div>

          {/* Casts */}
          <button type="button" onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
          >
            + Thêm diễn viên
          </button>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
            {allCasts.map(c => (
              <div key={c.id} className="p-3 bg-gray-800 rounded text-center">
                {c.image && <img src={c.image} alt={c.name} className="w-20 h-20 rounded-full mx-auto mb-1" />}
                <p className="truncate mb-1">{c.name}</p>
                <div className="flex justify-center gap-2">
                  <button onClick={() => dispatch(removeCastAction(c.id))} className="text-red-500">Xóa</button>
                  <button onClick={() => { setCastEdit(c); setModalOpen(true); }} className="text-yellow-300">Sửa</button>
                </div>
              </div>
            ))}
          </div>

          {/* Submit */}
          <button type="submit" disabled={isLoading}
            className="w-full py-3 bg-blue-700 text-white rounded-xl hover:bg-blue-800 disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {isLoading ? "Đang tải..." : <><ImUpload /> Đăng tải phim</>}
          </button>
        </form>
      </div>
    </SideBar>
  );
}
