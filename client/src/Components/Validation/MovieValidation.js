import * as yup from "yup";

const ReviewValidation = yup.object().shape({
  comment: yup
    .string()
    .required("Vui lòng nhập bình luận")
    .max(150, "Bình luận không được vượt quá 150 ký tự"),
  rating: yup.number().required("Vui lòng chọn đánh giá"),
});

const movieValidation = yup.object().shape({
  name: yup
    .string()
    .required("Vui lòng nhập tên phim")
    .max(50, "Tên phim không được vượt quá 50 ký tự"),
  time: yup.number().required("Vui lòng nhập thời lượng phim"),
  language: yup.string().required("Vui lòng nhập ngôn ngữ phim"),
  year: yup.number().required("Vui lòng nhập năm phát hành"),
  category: yup.string().required("Vui lòng chọn thể loại phim"),
  desc: yup
    .string()
    .required("Vui lòng nhập mô tả phim")
    .max(100000, "Mô tả phim không được vượt quá 1000 ký tự"),
});

export { ReviewValidation, movieValidation };
