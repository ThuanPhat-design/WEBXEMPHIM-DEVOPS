import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../Components/UsedInputs';
import { FiLogIn } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { LoginValidation } from '../Components/Validation/UserValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { InlineError } from '../Components/Notfications/Error';
import { loginAction } from '../Redux/Actions/userActions';
import { toast } from 'react-toastify';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isError, userInfo, isSuccess } = useSelector(
        (state) => state.userLogin
    );

    // Sử dụng react-hook-form với yupResolver để xử lý lỗi tự động
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginValidation)
    });

    // Hàm xử lý khi submit
    const onSubmit = async (data) => {
        try {
            // Gọi action đăng nhập
            dispatch(loginAction(data));
        } catch (error) {
            toast.error("Đăng nhập không thành công!");
        }
    };

    useEffect(() => {
        if (userInfo?.isAdmin) {
            navigate("/dashboard");
        } else if (userInfo) {
            navigate("/profile");
        }
        if (isSuccess) {
            toast.success(`Welcome back ${userInfo?.fullName}`);
        }
        if (isError) {
            toast.error(isError);
            dispatch({ type: "USER_LOGIN_RESET" });
        }
    }, [userInfo, isSuccess, isError, navigate, dispatch]);

    return (
        <Layout hideFooter={true} transparentNav={true} hideNav={true} >
            <div
                className="w-full min-h-screen flex-colo bg-cover bg-center bg-fixed "
                style={{ backgroundImage: 'url("https://res.cloudinary.com/dwfmpiozq/image/upload/v1743692824/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_oopzdx.png")' }}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-black rounded-lg border-gray-900 bg-opacity-60"
                >
                    <img
                        src="https://res.cloudinary.com/dwfmpiozq/image/upload/v1747808765/14344421-e223-43e7-9a46-072d81888d2f.png-removebg-preview_amakim.png"
                        alt="logo"
                        className="w-full h-20 object-contain"
                    />
                    <div className='w-full text-white'>
                        <Input
                            label="Email"
                            placeholder="DVP@gmail.com"
                            type="email"
                            name="email"
                            register={register("email")}
                            bg={true}
                        />
                        {errors.email && <InlineError text={errors.email.message} />}
                    </div>
                    <div className='w-full text-white'>
                        <Input
                            label="Mật khẩu"
                            placeholder="**********"
                            type="password"
                            bg={true}
                            name="password"
                            register={register("password")}
                        />
                        {errors.password && <InlineError text={errors.password.message} />}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
                    >
                        {isLoading ? (
                            "Loading..."
                        ) : (
                            <>
                                <FiLogIn /> Đăng nhập
                            </>
                        )}
                    </button>
                    <p className="text-center text-fuchsia-50">
                        Chưa có tài khoản?{" "}
                        <Link to="/register" className="text-red-600 font-semibold ml-2">
                            Đăng ký
                        </Link>
                    </p>
                </form>
            </div>
        </Layout>
    );
}

export default Login;
