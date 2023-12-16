const User = require("../models/userModel")
const jwt = require("jsonwebtoken");

const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // console.log(req.cookies.token);
        if (!token) {
            return res.status(401).send("Not Authorized")
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifyToken) {
            return res.status(401).json({ msg: "Unauthorized" })
        }
        const user = await User.findById(verifyToken.id).select("-password");
        if (!user) {
            return res.status(401).json({ msg: "User Not Found" })
        }
        req.user = user;
        next();

    } catch (error) { console.log(error.message) }
}

module.exports = protectedRoute;