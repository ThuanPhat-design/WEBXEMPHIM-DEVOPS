
import { useState } from "react";
import { toast } from "react-toastify";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export default function useTmdbAutoFill({
  watch,
  setValue,
  categories,
  apiUrl,
  setPosterMain,   // setter cho ảnh “không tiêu đề”
  setPosterTitle,  // setter cho ảnh “có tiêu đề”,    // callback để set poster URL
  setCasts      // callback để set mảng cast
}) {
  const [isFilling, setIsFilling] = useState(false);

  // Bản đồ ngôn ngữ
  const langMap = {
    en: "English",
    ja: "Japanese",
    ko: "Korean",
    fr: "French",
    es: "Spanish",
    th: "Thai",
    de: "German",
    it: "Italian",
    pt: "Portuguese",
    ru: "Russian",
    ar: "Arabic",
    hi: "Hindi",
    zh: "Chinese (Simplified)",
    "zh-TW": "Chinese (Traditional)",
    sv: "Swedish",
    no: "Norwegian",
    da: "Danish",
    fi: "Finnish",
    pl: "Polish",
    cs: "Czech",
    hu: "Hungarian",
    ro: "Romanian",
    uk: "Ukrainian",
    sk: "Slovak",
    sl: "Slovenian",
    hr: "Croatian",
    sr: "Serbian",
    bg: "Bulgarian",
    id: "Indonesian",
    ms: "Malay",
    fil: "Filipino",
    bn: "Bengali",
    pa: "Punjabi",
    ur: "Urdu",
    ta: "Tamil",
    te: "Telugu",
    kn: "Kannada",
    ml: "Malayalam",
    mr: "Marathi",
    he: "Hebrew",
    tr: "Turkish",
    fa: "Persian",
    nl: "Dutch",
    el: "Greek",
    vi: "Vietnamese",      
    is: "Icelandic",
    ga: "Irish",
    mt: "Maltese",
    sw: "Swahili"
  };

  // Dịch mô tả
  const translateToVI = async (text) => {
    try {
      const resp = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=en|vi`
      );
      const { responseData } = await resp.json();
      return responseData.translatedText;
    } catch {
      return text;
    }
  };

  const handleAutoFill = async () => {
    const title = watch("name");
    if (!title) return;
    setIsFilling(true);

    try {
      // 1) Lấy data từ server (TMDB)
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Không tìm thấy phim");
      }
      const data = await res.json();

      // 2) Điền time, language, year
      if (data.time) setValue("time", data.time);
      if (data.language) {
        const code = data.language.toLowerCase().trim();
        setValue("language", langMap[code] || code);
      }
      if (data.year) setValue("year", data.year);

      // 3) Poster
      if (data.poster) {
        const fullUrl = `${IMG_BASE}${data.poster}`;
        setPosterMain(fullUrl);
        setPosterTitle(fullUrl);
        setValue("image", fullUrl);       // nếu bạn có field “image”
        setValue("titleImage", fullUrl);  // và field “titleImage”
      }

      // 4) Dịch và điền mô tả
      if (data.desc) {
        const viDesc = await translateToVI(data.desc);
        setValue("desc", viDesc);
      }

      // 5) Xử lý thể loại
      let incomingCategory = "";
      if (typeof data.category === "string" && data.category.trim()) {
        incomingCategory = data.category.trim();
      } else if (Array.isArray(data.genres) && data.genres.length) {
        incomingCategory = data.genres[0].trim();
      }
      if (incomingCategory) {
        const key = incomingCategory.toLowerCase();
        const found = categories.find(
          (c) => c.title.toLowerCase().trim() === key
        );
        if (found) {
          setValue("category", found.title);
        } else {
          setValue("category", "");
          toast.info(`Không tìm thấy thể loại "${incomingCategory}"`);
        }
      }

      // 6) Casts
      if (Array.isArray(data.cast)) {
        // data.cast: [{ id, name, image }]
        setCasts(data.cast);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setIsFilling(false);
    }
  };

  return { handleAutoFill, isFilling };
}
