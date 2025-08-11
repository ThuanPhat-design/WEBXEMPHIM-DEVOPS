import React from 'react'
import Layout from '../Layout/Layout'
import Head from '../Components/Head'
import { FiPhoneCall, FiMapPin, FiMail } from 'react-icons/fi'

function ContactUs() {
    const ContactData = [
        {
            id: 1,
            title: 'Email Liên Hệ',
            info: 'Gửi email cho chúng tôi để nhận hỗ trợ và thông tin mới nhất.',
            icon: FiMail,
            contact: 'DVP@gmail.com',
        },
        {
            id: 2,
            title: 'Gọi Cho Chúng Tôi',
            info: 'Liên hệ qua điện thoại để được tư vấn nhanh chóng.',
            icon: FiPhoneCall,
            contact: '0941983908',
        },
        {
            id: 3,
            title: 'Địa Chỉ Văn Phòng',
            info: 'Đến trực tiếp tại văn phòng của chúng tôi để trải nghiệm dịch vụ.',
            icon: FiMapPin,
            contact: '280 An Dương Vương, P.3, Q.5, TP. HCM',
        },
    ]

    return (
        <Layout>
            <div className='min-height-screen container mx-auto px-2 my-6'>
                <Head title="Liên Hệ" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:my-20 my-10 xl:gap-8">
                    {ContactData.map((item) => (
                        <div
                            key={item.id}
                            className="border-border flex-colo p-10 bg-dry rounded-lg text-center"
                        >
                            <span className='flex-colo w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl'>
                                <item.icon />
                            </span>
                            <h5 className="text-xl font-semibold mb-2">{item.title}</h5>
                            <p className='mb-0 text-sm text-text leading-7'>
                                {item.contact && (
                                    item.title === 'Email Liên Hệ' ? (
                                        <a href={`mailto:${item.contact}`} className="text-blue-600">
                                            {item.contact}
                                        </a>
                                    ) : item.title === 'Gọi Cho Chúng Tôi' ? (
                                        <a href={`tel:${item.contact}`} className="text-blue-600">
                                            {item.contact}
                                        </a>
                                    ) : (
                                        <span className="text-white">{item.contact}</span>
                                    )
                                )}
                                {' '}{item.info}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default ContactUs
