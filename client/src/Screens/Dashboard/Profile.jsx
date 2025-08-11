import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import Uploder from '../../Components/Uploder';
import { Input } from '../../Components/UsedInputs';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileValidation } from '../../Components/Validation/UserValidation';
import { InlineError } from '../../Components/Notfications/Error';
import { ImagePreview } from '../../Components/ImagePreview';
import { deleteProfileAction, updateProfileAction } from '../../Redux/Actions/userActions';
import { toast } from 'react-toastify';

function Profile() {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userLogin);
    
    const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : ""); 
    const { isLoading, isError, isSuccess } = useSelector(
        (state) => state.userUpdateProfile
    );
    const { isLoading: deleteLoading, isError: deleteError } = useSelector(
        (state) => state.userDeleteProfile
    );
    // Validate user
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ProfileValidation)
    });

    // update profile
    const onSubmit = (data) => {
        dispatch(updateProfileAction({ ...data, image: imageUrl }));
    };

    // delete profile
    const deleteProfile = () => {
        window.confirm("Bạn thật sự vô hiệu tài khoản ?") && 
        dispatch(deleteProfileAction());
    };

    // useEffect
    useEffect(() => {
       if (userInfo) {
           setValue("fullName", userInfo?.fullName);
           setValue("email", userInfo?.email);
       }
       if(isSuccess) {
        dispatch({type:"USER_UPDATE_PROFILE_RESET"});
       }
       if(isError || deleteError) {
        toast.error(isError || deleteError);
        dispatch({type:"USER_UPDATE_PROFILE_RESET"});
        dispatch({ type:"USER_DELETE_PROFILE_RESET"});

       }
    }, [userInfo, setValue , isSuccess,isError,dispatch, deleteError]);

    return (
        <SideBar>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Thông tin </h2>
                <div className='w-full grid lg:grid-cols-12 gap-6'>
                    <div className='col-span-10'>
                        <Uploder setImageUrl={setImageUrl} />
                    </div>
                    {/* image preview */}
                    <div className='col-span-2'>
                        <ImagePreview 
                            image={imageUrl} 
                            name={userInfo ? userInfo.fullName : "DVP"}
                        />
                    </div>
                </div>
                
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
                <Input
                    label="Email"
                    placeholder="DVP@gmail.com"
                    type="email"
                    bg={true}
                    register={register("email")}
                />
                <div className="flex flex-wrap justify-between gap-4 my-4">
                    <button
                        onClick={deleteProfile}
                        disabled ={deleteLoading || isLoading }
                        className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
                    >
                        { deleteLoading ? "Đang xóa..." : "Xóa tài khoản"}
                    </button>
                    <button
                        disabled ={deleteLoading || isLoading }
                        className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
                    >
                        { isLoading ? "Đang cập nhật..." : "Cập nhật"}
                    </button>
                </div>
            </form>
        </SideBar>
    );
}

export default Profile;
