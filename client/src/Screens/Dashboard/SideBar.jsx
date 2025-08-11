import React from 'react'; // This is correct, no need to import 'jsx-no-undef'
import Layout from '../../Layout/Layout';
import { BsFillGridFill } from 'react-icons/bs'
import { FaHeart, FaListAlt,  FaUsers } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { HiViewGridAdd} from 'react-icons/hi'
import {RiMovie2Fill,RiLockPasswordLine, RiLogoutCircleLine} from 'react-icons/ri'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../Redux/Actions/userActions';
import { toast } from 'react-toastify';
function SideBar({children}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector(
        (state) => state.userLogin
    );

    // logout function
    const logOutHandler = () => {
        dispatch(logoutAction())
        toast.success("Logged out successfully")
        navigate("/login")
        
    }
    const SideLinks = 
    userInfo?.isAdmin ?
        [
        {
            name:"Dashboard",
            link :"/dashboard",
            icon : BsFillGridFill
        },
        {
            name:"Danh sách phim",
            link :"/movieslist",
            icon : FaListAlt,
        },
        {
            name:"Thêm phim",
            link :"/addmovie",
            icon : RiMovie2Fill,
        },
        {
            name:"Thể loại",
            link :"/categories",
            icon : HiViewGridAdd
        },
        {
            name:"Người dùng",
            link :"/users",
            icon : FaUsers,
        },
        {
            name:"Thông tin tài khoản",
            link :"/profile",
            icon : FiSettings
        },
        {
            name:"Danh sách yêu thích",
            link :"/favorites",
            icon : FaHeart,
        },
        {
            name:"Thay đổi mật khẩu",
            link :"/password",
            icon : RiLockPasswordLine
        }
    ] : userInfo ? [
        {
            name:"Thông tin tài khoản",
            link :"/profile",
            icon : FiSettings
        },
        {
            name:"Danh sách yêu thích",
            link :"/favorites",
            icon : FaHeart,
        },
        {
            name:"Thay đổi mật khẩu",
            link :"/password",
            icon : RiLockPasswordLine
        },
        {
            name: "Gói tài khoản",
            link: "/account-plans",
            icon: RiMovie2Fill 
        }
    ] : []
       ;
    
   

const active = "bg-dryGray text-subMain "
const hover ="hover:text-white hover:bg-main"
const inActive ="rounded font-medium text-sm transition flex gap-3 items-center p-4"
const Hover = ({isActive}) => 
    isActive? `${active}  ${inActive}` :` ${inActive}  ${hover}`;

    return (
        <Layout>
            <div className="min-h-screen container mx-auto px-2 ">
                <div className='xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6'>
                    <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
                        {
                            SideLinks.map((link,index) => ( 
                                <NavLink to={link.link} key={index} className={Hover}>
                                    <link.icon/><p>{link.name}</p>
                                </NavLink> 
                            ))
                        }
                        <button onClick={logOutHandler} className={`${inActive} ${Hover} w-full`}>
                        <RiLogoutCircleLine/> Đăng xuất
                        </button>
                    </div>
                    <div
                    data-aos="fade-up "
                    data-aos-duration="1000"
                    data-aos-delay="10"
                    data-aos-offset="200"
                    className='col-span-6 rounded-md bg-dry border-gray-800 p-6'>{children}</div>
                </div>
            </div>
        </Layout>
    )
}
export default SideBar ;