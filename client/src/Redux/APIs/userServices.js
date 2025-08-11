import Axios from "./Axios.js";


// ***************** public apis ******************//

// Đăng ký người dùng mới
const registerService = async (user) => {
  const { data } = await Axios.post("/users", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

// Đăng xuất người dùng
const logoutService = () => {
  localStorage.removeItem("userInfo");
  return null;
}

// Đăng nhập người dùng
const loginService = async (user) => {
  const { data } = await Axios.post("/users/login", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

// ***************** private apis ******************//

// update profile API call
const updateProfileService = async (user,token) => {
  const { data } = await Axios.put("/users", user,{
    headers:{
      Authorization:`Bearer ${token}`,
    }
  })
  if (data) {
      localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
}

// delete profile API call
const deleteProfileService = async (token) => {
  const { data } = await Axios.delete("/users", {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  });

  if (data) {
      localStorage.removeItem("userInfo");
  }

  return data;
};

// change password API call
const changePasswordService = async (passwords, token ) => {
  const { data } = await Axios.put("/users/password", passwords, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// get all favourite movies
const getFavouriteMovies = async (token) => {
  const { data } = await Axios.get("/users/favorites",{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete all favourite movies
const deleteFavoriteMovies = async (token) => {
  const { data } = await Axios.delete("/users/favorites",{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// like movie API call
const likeMovieService = async (movieId, token) => {
  const { data } = await Axios.post(`/users/favorites`, movieId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};


// ***************** admin apis ******************//

// admin get all users
const getAllUserService = async (token) => {
  const {data} =await Axios.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// admin delete user
const deleteUserService = async (id, token) => {
  const {data} = await Axios.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export { 
  registerService, 
  logoutService, 
  loginService, 
  updateProfileService,
  deleteProfileService,
  changePasswordService,
  getFavouriteMovies,
  deleteFavoriteMovies,
  getAllUserService,
  deleteUserService,
  likeMovieService,
};

