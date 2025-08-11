import React, { useEffect, useState } from 'react';
import MainModal from './MainModal';
import { Input } from '../UsedInputs';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction, updateCategoryAction } from '../../Redux/Actions/CategoriesActions';
import toast from 'react-hot-toast';

function CategoryModal({ modalOpen, setModalOpen, category }) {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();

    const { isLoading, isError, isSuccess } = useSelector((state) => state.categoryCreate);
    const { isLoading: upLoading, isError: upError, isSuccess: upSuccess } = useSelector((state) => state.categoryUpdate);

    // Submit handler
    const submitHandler = (e) => {
        e.preventDefault();
        if (title) {
            if (category) {
                dispatch(updateCategoryAction(category?._id, { title }));
                setModalOpen(!modalOpen);
            } else {
                dispatch(createCategoryAction({ title }));
                setTitle("");
            }
        } else {
            toast.error("Please write a category name");
        }
    };

    // Effect to handle errors and success
    useEffect(() => {
        if (upError || isError) {
            toast.error(upError || isError);
            dispatch({
                type: isError ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET"
            });
        }
    
        if (isSuccess || upSuccess) {
            toast.success("Thao tác thể loại thành công");
            dispatch({
                type: isSuccess ? "CREATE_CATEGORY_RESET" : "UPDATE_CATEGORY_RESET"
            });
            setModalOpen(false);
        }
    
        if (modalOpen && category) {
            setTitle(category.title);
        }
    
        if (!modalOpen && !category) {
            setTitle("");
        }
    }, [dispatch, isError, isSuccess, upError, upSuccess, category, modalOpen, setModalOpen]);
    

    return (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className='inline-block sm-w-4/5 border border-border md:w-3/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl'>
                <h2 className='text-3xl font-bold'>{category ? "Cập nhật" : "Tạo"}</h2>
                <form className='flex flex-col gap-6 text-left mt-6' onSubmit={submitHandler}>
                    <Input
                        label="Tên thể loại"
                        placeholder="Actions"
                        type="text"
                        bg={false}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button
                        disabled={isLoading || upLoading}
                        type='submit'
                        className='w-full flex-colo gap-4 py-3 font-bold text-lg transitions hover:bg-dry rounded bg-subMain text-white'>
                        {isLoading || upLoading ? "Đang ..." : category ? "Cập nhật" : "Tạo"}
                    </button>
                </form>
            </div>
        </MainModal>
    );
}

export default CategoryModal;
