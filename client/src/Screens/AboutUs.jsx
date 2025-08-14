import React from 'react'
import Layout from '../Layout/Layout'

function AboutUs() {
  return (
    <Layout>
      {/* Banner Section */}
      <div className="relative w-full overflow-hidden h-96"> {/* tăng chiều cao lên h-96 */}
        <img
          src="https://res.cloudinary.com/dwfmpiozq/image/upload/v1747806171/09760480-df72-43de-a27e-9e2ec58169c6_shxn6t.png"
          alt="Banner"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white"> {/* tăng font-size title */}
            Thông tin về nhóm 6
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 grid gap-12 lg:grid-cols-2 items-center">
        {/* Text Area */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Chào mừng đến với DVP
          </h2>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            DVP là đề tài web xem phim trực tuyến do nhóm 6 thực hiện dựa trên ReactJS, lấy cảm hứng từ Netflix.
          </p>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            Chức năng: Đăng nhập, Đăng ký, Xem phim, Tìm kiếm, Đánh giá, Yêu thích, Quản trị phim & user.
          </p>
          <div className="text-lg text-gray-300 mb-6 leading-relaxed">
            <p>Nhóm 6 bao gồm 4 thành viên:</p>
            <ul className="list-none mt-2 space-y-1">
              {[
                'Đàng Huỳnh Khánh Đoan - 48.01.104.027',
                'Nguyễn Quang Vinh - 48.01.104.149',
                'Trần Thuật Phát - 48.01.104.103',
                'Nguyễn Minh Hiếu - 48.01.104.044',
              ].map((member, i) => (
                <li
                  key={i}
                  className="relative pl-4 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-px before:bg-white"
                >
                  {member}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Image Preview */}
        <div className="w-full">
          <img
            src="https://res.cloudinary.com/dwfmpiozq/image/upload/v1747805877/HINH_c9we5f.png"
            alt="About us"
            className="w-full rounded-lg object-cover shadow-xl"
          />
        </div>
      </div>
    </Layout>
  )
}

export default AboutUs
