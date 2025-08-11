import React, { useEffect } from 'react';
import SideBar from './SideBar';
import Table from '../../Components/Table';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavoriteMoviesAction, getFavoriteMoviesAction } from '../../Redux/Actions/userActions';
import toast from 'react-hot-toast';
import Loader from '../../Components/Notfications/Loader';
import { Empty } from '../../Components/Notfications/Empty';

function FavoritesMovies() {
    const dispatch = useDispatch();

    const { isLoading, isError, likedMovies = [] } = useSelector(
        (state) => state.userGetFavoriteMovies
    );

    // delete
    const {
        isLoading: deleteLoading, 
        isError: deleteError,
        isSuccess,
    } = useSelector(
        (state )=> state.userDeleteFavoriteMovies
    );

    // delete movies handler
    const deleteMoviesHandler = () => {
        window.confirm("Bạn muốn xóa hết danh sách phim yêu thích ") &&
        dispatch(deleteFavoriteMoviesAction());
    };

    // useEffect
    useEffect(() => {
        dispatch(getFavoriteMoviesAction());
        if (isError || deleteError) {
            toast.error(isError || deleteError);
            dispatch({type: isError ? "GET_FAVOURITE_MOVIES_RESET" : "DELETE_FAVOURITE_MOVIES_RESET"});
        }
    }, [dispatch, isError, deleteError, isSuccess]);

    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <div className='flex-btn gap-2'>
                    <h2 className="text-xl font-bold">Danh sách yêu thích</h2>
                    {
                        likedMovies.length > 0 &&
                        <button
                            disabled={deleteLoading}
                            onClick={deleteMoviesHandler}
                            className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded'>
                            { deleteLoading ? "Đang xóa..." : "Xóa tất cả" }
                        </button>
                    }
                </div>
                {
                    isLoading ? (
                        <Loader />
                    ) : likedMovies.length > 0 ? (
                        <Table data={likedMovies} admin={false} />
                    ) : (
                        <Empty message="Bạn chưa yêu thích phim nào" />
                    )
                }
            </div>
        </SideBar>
    );
}

export default FavoritesMovies;