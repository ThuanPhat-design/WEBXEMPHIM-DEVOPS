/* eslint-disable no-template-curly-in-string */
import React, { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaSearch, FaUser } from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux'
import { logoutAction } from '../../Redux/Actions/userActions';

function NavBar({ transparent, absolute }) {
  const [search, setSearch] = useState("")
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector(s => s.userLogin)

  // Ref để detect click ngoài và đóng dropdown
  const menuRef = useRef()
  useEffect(() => {
    const handleClickOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Live-search
  const handleSearch = e => {
    const q = e.target.value
    setSearch(q)
    if (q.trim()) navigate(`/movies/${q.trim()}`)
    else          navigate('/movies')
  }

  // Đăng xuất
  const handleLogout = () => {
    dispatch(logoutAction())
    navigate('/login')
  }

  return (
    <div className={`
    ${transparent ? 'bg-transparent shadow-none' : 'bg-main shadow-md'}
    ${absolute    ? 'absolute top-0 left-0 right-0' : 'sticky top-0'}
    z-50 bg-opacity-10 backdrop-blur-sm
    h-25         /* cố định chiều cao Navbar */
  `}>
      <div className="container mx-auto py-6 px-4 grid grid-cols-12 gap-4 items-center">
        {/* LOGO */}
        <div className='col-span-2'>
          <Link to="/"><img
            src="https://res.cloudinary.com/dwfmpiozq/image/upload/v1747808765/14344421-e223-43e7-9a46-072d81888d2f.png-removebg-preview_amakim.png"
            alt="logo"
            className='w-full h-20 object-contain'
          /></Link>
        </div>

        {/* MENU */}
        <div className='col-span-6 hidden lg:flex gap-8 items-center font-medium text-sm'>
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-subMain' : 'hover:text-subMain text-white'}>Trang chủ</NavLink>
          <NavLink to="/movies" className={({ isActive }) => isActive ? 'text-subMain' : 'hover:text-subMain text-white'}>Phim</NavLink>
          <NavLink to="/favorites" className={({ isActive }) => isActive ? 'text-subMain' : 'hover:text-subMain text-white'}>Yêu thích</NavLink>
          <NavLink to="/about-us" className={({ isActive }) => isActive ? 'text-subMain' : 'hover:text-subMain text-white'}>Thông tin</NavLink>
          <NavLink to="/contact-us" className={({ isActive }) => isActive ? 'text-subMain' : 'hover:text-subMain text-white'}>Liên hệ</NavLink>
        </div>

        {/* SEARCH + USER */}
        <div className='col-span-4 flex items-center justify-end gap-4 relative' ref={menuRef}>
          {/* Live Search */}
          <div className={`
              relative flex items-center bg-black rounded-full overflow-hidden
              transition-all duration-300
              ${search.trim() ? 'w-48' : 'w-10 hover:w-48 focus-within:w-48'}
            `}
          >
            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-subMain w-5 h-5" />
            <input
              type="search"
              value={search}
              onChange={handleSearch}
              placeholder="Tìm kiếm phim"
              className="bg-transparent placeholder:text-border focus:outline-none transition w-full pl-10 pr-2 py-2"
            />
          </div>

          {/* User Icon & Dropdown */}
          <button
            onClick={() => userInfo ? setShowMenu(v => !v) : navigate('/login')}
            className="relative focus:outline-none"
          >
            {userInfo?.image
              ? <img
                  src={userInfo.image}
                  alt={userInfo.fullName}
                  className='w-8 h-8 rounded-full border border-subMain object-cover'
                />
              : <FaUser className="w-8 h-8 text-white" />
            }
          </button>

          {showMenu && (
            <ul className="absolute right-0 top-full mt-1 w-44 bg-gray-800 text-white rounded shadow-lg z-50">
              {userInfo.isAdmin ? (
                <li>
                  <button
                    onClick={() => { navigate('/dashboard'); setShowMenu(false) }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    Dashboard Admin
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <button
                      onClick={() => { navigate('/profile'); setShowMenu(false) }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700"
                    >
                      Hồ sơ của tôi
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => { navigate('/account-plans'); setShowMenu(false) }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700"
                    >
                      Gói tài khoản
                    </button>
                  </li>
                </>
              )}

              <li><hr className="border-gray-600" /></li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700"
                >
                  Đăng xuất
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default NavBar
