// src/config/movieSections.js
import { FaBolt, FaLaughSquint, FaCompass, FaGhost, FaHeart, FaQuestion } from 'react-icons/fa';
import { GiMagicPortal, GiSharpSmile }                                     from 'react-icons/gi';

const movieSections = [
  {
    key: 'action',
    title: 'Bùng Nổ Adrenaline Với Hành Động Đỉnh Cao',
    genre: 'Action',
    icon: FaBolt,
  },
  {
    key: 'comedy',
    title: 'Cười Thả Ga Với Những Tác Phẩm Hài Hước Hay Nhất',
    genre: 'Comedy',
    icon: FaLaughSquint,
  },
  {
    key: 'adventure',
    title: 'Cuộc Phiêu Lưu Kỳ Thú Khám Phá Thế Giới Mới',
    genre: 'Adventure',
    icon: FaCompass,
  },
  {
    key: 'horror',
    title: 'Rợn Người Với Những Bộ Phim Kinh Dị Ám Ảnh',
    genre: 'Horror',
    icon: FaGhost,
  },
  {
    key: 'romance',
    title: 'Lãng Mạn Say Đắm Trong Những Câu Chuyện Tình Yêu',
    genre: 'Romance',
    icon: FaHeart,
  },
  {
    key: 'fantasy',
    title: 'Thế Giới Huyền Ảo Và Phép Thuật Kỳ Diệu',
    genre: 'Teen Fantasy',
    icon: GiMagicPortal,
  },
  {
    key: 'thriller',
    title: 'Giật Gân Tột Độ Với Những Pha Cao Trào Kịch Tính',
    genre: 'Thriller',
    icon: GiSharpSmile,
  },
  {
    key: 'mystery',
    title: 'Bí Ẩn Chưa Có Lời Giải – Đón Nhận Sự Hồi Hộp',
    genre: 'Mystery',
    icon: FaQuestion,
  },
];

export default movieSections;
