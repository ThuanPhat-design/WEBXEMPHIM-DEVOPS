import React, { useEffect } from 'react'
import Layout from '../Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../Components/UsedInputs'
import { FiLogIn } from 'react-icons/fi'
import { InlineError } from '../Components/Notfications/Error'
import { toast } from 'react-toastify'
import { registerAction } from '../Redux/Actions/userActions'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterValidation } from '../Components/Validation/UserValidation'
import { useDispatch, useSelector } from 'react-redux'


function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isError, userInfo, isSuccess } = useSelector(
        (state) => state.userRegister
    );

    // Validate user
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(RegisterValidation)
    });

    // On submit
    const onSubmit = (data) => {
        dispatch(registerAction(data));
    };

    useEffect(() => {
        if (userInfo?.isAdmin) {
            navigate("/dashboard");
        } else if (userInfo) {
            navigate("/profile");
        }
        if (isSuccess) {
            toast.success(`Welcome ${userInfo?.fullName}`);
            dispatch({ type: "USER_REGISTER_RESET" });

        }
        if (isError) {
            toast.error(isError);
            dispatch({ type: "USER_REGISTER_RESET" });
        }
    }, [userInfo, isSuccess, isError, navigate, dispatch]);

    return (
        <Layout hideFooter={true} transparentNav={true} hideNav={true}>
            <div
                className="w-full h-screen flex-colo bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url("https://res.cloudinary.com/dwfmpiozq/image/upload/v1743692824/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_oopzdx.png")' }}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)} className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:2-3/5 bg-black rounded-lg border-border bg-opacity-60">
                    <img
                        src="https://res.cloudinary.com/dwfmpiozq/image/upload/v1730567122/Logo_m2ooop.png"
                        alt="logo"
                        className="w-full h-12 object-contain"
                    />
                     <div className='w-full'>
                        <Input
                            label="Tên người dùng"
                            placeholder="DVP"
                            type="text"
                            name="fullName"
                            register={register("fullName")}
                            bg={true}
                        />
                        {errors.fullName && <InlineError text={errors.fullName.message} />}
                    </div>

                    <div className='w-full'>
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
                    <div className='w-full'>
                        <Input
                            label="Mật khẩu"
                            placeholder="*******"
                            type="password"
                            name="password"
                            register={register("password")}
                            bg={true}
                        />
                        {errors.password && <InlineError text={errors.password.message} />}
                    </div>
    
                    <button
                        type='submit' 
                        disabled={isLoading}
                        className="bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full">
                        {isLoading ? (
                            "Loading..."
                        ) : (
                            <>
                                <FiLogIn /> Đăng ký
                            </>
                        )}
                    </button>
                    <p className="text-center text-fuchsia-50">
                        Đã có tài khoản?{""}
                        <Link to="/login" className="text-red-600 font-semibold ml-2">
                            Đăng nhập
                        </Link>
                    </p>
                </form></div>
        </Layout>

    )
}

export default Register
