import asyncHandler from "express-async-handler"
import User from "../Models/UserModels.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../middlewares/Auth.js";
import AccountPlan from '../Models/AccountPlansModel.js';

// @desc Register user
// @route POST /api/users/
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const {fullName, email, password, image} = req.body
    try {
        const userExists = await User.findOne ({ email})
        // check if user exists
        if(userExists) {
            res.status(400)
            throw new Error("User already exists")
        }
        
        // hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user in DB
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            image,
        });

        //if user created successfully send user data and token to client
        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isadmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
});

//@desc Login user
// @route POST /api/users/
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        // Tìm người dùng trong cơ sở dữ liệu
        const user = await User.findOne({ email });

        // Nếu tìm thấy người dùng, so sánh mật khẩu đã mã hóa
        if (user && (await bcrypt.compare(password, user.password))) {
            return res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } 
        
        // Nếu không tìm thấy người dùng hoặc mật khẩu không khớp
        return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });

    } catch (error) {
        console.error("Lỗi đăng nhập:", error.message);
        return res.status(500).json({ message: "Lỗi máy chủ, vui lòng thử lại sau" });
    }
});


//**** PRIVATE CONTROLLERS ****

// @desc Update user profile
// @route PUT/api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const { fullName, email, image} = req.body;
    try{
        //find user in DB
        const user = await User.findById(req.user._id);
        //if user exists update user dat and save it in DB
        if(user){
            user.fullName = fullName || user.fullName;
            user.email = email || user.email;
            user.image = image || user.image;

            const updatedUser = await user.save();
            //send updated user data anh token to client
            res.json({
                _id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                image: updatedUser.image,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),
            });
        }
        // else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    }  catch (error){
        res.status(400).json({ message: error.message});
    } 
});

// @desc Delete user profile 
// @route DELETE /api/users
// @access Private
const deleteUserProfile = asyncHandler(async (req, res) =>{
    try{
        // find user in DB
        const user = await User.findById(req.user._id);
        //if user exists delete user from DB
        if (user){
            //if user admin throw error message
            if(user.isAdmin){
                res.status(400);
                throw new Error("Can't delete admin user");
            }
             // else delete user from DB 
            await user.deleteOne();
            res.json({message: " User delete successfully"});
        }
         // else send error message
         else {
           res.status(404);
           throw new Error ("User not founr");
         }
    } catch (error){
        res.status(400).json({ message: error.message});
    }  
});

// @route PUT /api/users/password
// @desc Change user password
// @access Private
const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        // find user in DB
        const user = await User.findById(req.user._id);   
        // if user compare old password with hashed passwor then update user password and save it in DB
        if (user && (await bcrypt.compare(oldPassword, user.password))) {
            // hash new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            await user.save();
            res.json({ message: "Password changed!" });
        } 
        // else send error message
        else {
            res.status(401);
            throw new Error("Invalid old password");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Get all liked movies
// @route Get /api/users/favorites
// @access Private
const getLikedMovies = asyncHandler(async (req, res) => {
    try {
        // find user in DB
        const user = await User.findById(req.user._id).populate("likedMovies");
        
        if (user) {
            // send liked movies to client
            res.json(user.likedMovies);
        } else {
            // send not found error if user doesn't exist
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// @desc Add movie to liked movies
// @route POST /api/users/favorites
// @access Private
const addLikedMovie = asyncHandler(async (req, res) => {
    const { movieId } = req.body;
  
    try {
      // Find user in DB
      const user = await User.findById(req.user._id);
  
      // If user exists, add movie to liked movies and save it in DB
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if movie is already liked
      if (user.likedMovies.includes(movieId)) {
        return res.status(409).json({ message: "Movie already liked" });
      }
  
      // Add movie to liked movies and save in DB
      user.likedMovies.push(movieId);
      await user.save();
  
      // Respond with the updated liked movies array
      res.status(200).json({ likedMovies: user.likedMovies });
    } catch (error) {
      console.error("Error adding liked movie:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

// @desc Delete all liked movies
// @route DELETE /api/users/favorites
// @access Private
const deleteLikedMovies = asyncHandler(async (req, res) => {
    try {
        // find user in DB
        const user = await User.findById(req.user._id);
        // if user exists delete all liked movies and save it in DB
        if (user) {
            user.likedMovies = [];
            await user.save();
            res.json({ message: "Danh sách yêu thích của bạn đã xóa toàn bộ " });

        } 
        // else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ************* ADMIN CONTROLLERS *************
// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    try {
        // find all users in DB
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    try {
        // find user in DB
        const user = await User.findById(req.params.id);
        // if user exists delete user from DB
        if (user) {
            // if user is admin throw error message
            if (user.isAdmin) {
                res.status(400);
                throw new Error("Can't delete admin user");
            }
            // else delete user from DB
            await user.deleteOne();
            res.json({ message: "User deleted successfully" });
        } 
        // else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc   User chọn gói tài khoản
// @route  POST /api/users/:userId/subscribe
// @access Private
export const subscribePlan = asyncHandler(async (req, res) => {
  const { planId } = req.body;
  const userId      = req.params.userId;

  // 1) Kiểm tra plan tồn tại
  const plan = await AccountPlan.findById(planId);
  if (!plan) {
    res.status(404);
    throw new Error('Plan not found');
  }

  // 2) Cập nhật user
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.plan = plan._id;
  user.isAccountActive = true;
  await user.save();

  res.json({
    message: 'Subscribed successfully',
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      plan: plan.name,
      isAccountActive: user.isAccountActive,
    }
  });
});

export { registerUser,
         loginUser, 
         updateUserProfile,
         changeUserPassword,
         deleteUserProfile,
         getLikedMovies,
         addLikedMovie,
         deleteLikedMovies,
         getUsers,
         deleteUser,
        };