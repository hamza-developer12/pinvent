const express = require("express")
const {
    registerUser, loginUser, logoutUser, getUser, loginStatus, updateUser, changePassword, forgotPassword, resetPassword }
    = require("../controllers/userController")
const protectedRoute = require("../middlewares/authMiddleware");
const jwt = require("jsonwebtoken")
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser);
router.get('/logout', protectedRoute, logoutUser);
router.get('/getuser', protectedRoute, getUser);
router.get('/loggedin', loginStatus);
router.put('/updateuser', protectedRoute, updateUser);
router.put('/changepassword', protectedRoute, changePassword);
router.post('/forgotpassword', forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword)

module.exports = router;