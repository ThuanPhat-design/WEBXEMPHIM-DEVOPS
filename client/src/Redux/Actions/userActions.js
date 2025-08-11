import * as userConstants from "../Constants/userConstants";
import * as movieConstants from "../Constants/MoviesConstants";
import * as categoriesConstants from "../Constants/CategoriesConstants";

import * as userApi from "../APIs/userServices";

import { ErrorsAction, tokenProtection } from "../Protection";
import { toast } from "react-toastify";

// Helper function to get the token
const getToken = (getState) => tokenProtection(getState);

// login action
const loginAction = (datas) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.USER_LOGIN_REQUEST });

        const response = await userApi.loginService(datas);
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
        toast.success("Đăng nhập thành công");
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
    }
};

// register action
const registerAction = (datas) => async (dispatch) => {
    try {
        dispatch({ type: userConstants.USER_REGISTER_REQUEST });

        const response = await userApi.registerService(datas);
        dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
        toast.success("Đăng ký thành công");
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
    }
};

// logout action
const logoutAction = () => (dispatch) => {
    userApi.logoutService();

    dispatch({ type: userConstants.USER_LOGOUT });
    dispatch({ type: userConstants.USER_LOGIN_RESET });
    dispatch({ type: userConstants.USER_REGISTER_RESET });
    dispatch({ type: userConstants.DELETE_FAVORITE_MOVIES_RESET });
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_RESET });
    dispatch({ type: userConstants.USER_DELETE_PROFILE_RESET });
    dispatch({ type: userConstants.USER_CHANGE_PASSWORD_RESET });
    dispatch({ type: userConstants.GET_FAVORITE_MOVIES_RESET });
    dispatch({ type: userConstants.GET_ALL_USERS_RESET });
    dispatch({ type: userConstants.DELETE_USERS_RESET });
    dispatch({ type: userConstants.LIKE_MOVIE_RESET });

    dispatch({ type: movieConstants.MOVIE_DETAILS_RESET });
    dispatch({ type: movieConstants.CREATE_REVIEW_RESET });
    dispatch({ type: movieConstants.CREATE_MOVIE_RESET });
    dispatch({ type: movieConstants.RESET_CAST });
    dispatch({ type: movieConstants.UPDATE_MOVIE_RESET });

    dispatch({ type: categoriesConstants.CREATE_CATEGORY_RESET });
    dispatch({ type: categoriesConstants.UPDATE_CATEGORY_RESET });
    dispatch({ type: categoriesConstants.DELETE_CATEGORY_RESET });

    toast.success("Đăng xuất thành công");  
};

// update profile action
const updateProfileAction = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
        const response = await userApi.updateProfileService(user, getToken(getState));
        dispatch({ type: userConstants.USER_UPDATE_PROFILE_SUCCESS, payload: response });
        toast.success("Tài khoản đã được cập nhật thành công");
        dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
    }
};

// delete profile action
const deleteProfileAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });

        await userApi.deleteProfileService(getToken(getState));
        dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS });
        toast.success("Profile deleted");

        dispatch(logoutAction());
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
    }
};

// change password action
const changePasswordAction = (passwords) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
        const response = await userApi.changePasswordService(passwords, getToken(getState));
        dispatch({ type: userConstants.USER_CHANGE_PASSWORD_SUCCESS, payload: response });
        toast.success("Password changed successfully");
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
    }
};

// get all favorite movies action
const getFavoriteMoviesAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.GET_FAVORITE_MOVIES_REQUEST });
        const response = await userApi.getFavouriteMovies(getToken(getState));
        dispatch({ type: userConstants.GET_FAVORITE_MOVIES_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.GET_FAVORITE_MOVIES_FAIL);
    }
};

// delete all favorite movies action
const deleteFavoriteMoviesAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.DELETE_FAVORITE_MOVIES_REQUEST });
        await userApi.deleteFavoriteMovies(getToken(getState));
        dispatch({ type: userConstants.DELETE_FAVORITE_MOVIES_SUCCESS });
        toast.success("Favorite movies deleted");
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.DELETE_FAVORITE_MOVIES_FAIL);
    }
};

// admin get all users action
const getAllUsersAction = () => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
        const response = await userApi.getAllUserService(getToken(getState));
        dispatch({ type: userConstants.GET_ALL_USERS_SUCCESS, payload: response });
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL);
    }
};

// admin delete user action
const deleteUsersAction = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.DELETE_USERS_REQUEST });
        await userApi.deleteUserService(id, getToken(getState));
        dispatch({ type: userConstants.DELETE_USERS_SUCCESS });
        toast.success("User deleted");
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.DELETE_USERS_FAIL);
    }
};

// user like movie action
const likeMovieAction = (movieId) => async (dispatch, getState) => {
    try {
        dispatch({ type: userConstants.LIKE_MOVIE_REQUEST });
        const response = await userApi.likeMovieService(movieId, getToken(getState));
        dispatch({ type: userConstants.LIKE_MOVIE_SUCCESS, payload: response });
        toast.success("Added to favorites");
        dispatch(getFavoriteMoviesAction());
    } catch (error) {
        ErrorsAction(error, dispatch, userConstants.LIKE_MOVIE_FAIL);
    }
};

export {
    loginAction,
    registerAction,
    logoutAction,
    updateProfileAction,
    deleteProfileAction,
    changePasswordAction,
    getFavoriteMoviesAction,
    deleteFavoriteMoviesAction,
    getAllUsersAction,
    deleteUsersAction,
    likeMovieAction
};
