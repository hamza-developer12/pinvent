const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../middlewares/passwordMiddleware");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const Token = require("../models/tokenModel");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })
}

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({ msg: "Please filled all the fields" })
    }

    if (password.length < 6) {
        return res.status(400).json({ msg: "Password must have at least 6 characters " })
    }
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User Already Exists" })
        }
        const user = await User.create({
            name: name,
            email: email,
            password: await hashPassword(password),
            photo: "photo", phone: "phone", bio: "bio",
        })
        await user.save();


        if (user) {
            const token = generateToken(user._id);
            res.cookie("token", token, {
                path: "/",
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400), // 1day
                sameSite: "none",
                secure: true
            });
            return res.status(201).json({

                msg: "Account Created Successfully", user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    photo: user.photo
                },
                token,
            })
        }

    } catch (error) { console.log(error.message) }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: "Please Provide the Login Credentials" })
    }
    let user;
    try {
        user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User Not Found" })
        }
        const comparePass = await comparePassword(password, user.password);
        if (!comparePass) {
            return res.status(400).json({ msg: "Invalid Email or Password" });
        }
        const token = generateToken(user._id);
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1day
            sameSite: "none",
        });
        return res.status(200).json({
            msg: "Login Successfull", user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                photo: user.photo
            },
            token,
        })
    } catch (error) {
        console.log(error.message);
    }

}

const logoutUser = async (req, res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0),
        sameSite: "none",
    });
    return res.status(200).json({ msg: "Loguout Successfully" })
}

const getUser = async (req, res) => {
    let user;
    try {
        user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(400).json({ msg: "User Not Found" })
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error.message);
    }
}
const loginStatus = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json(false);
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
        return res.json(false)
    }
    return res.json(true)
}

const updateUser = async (req, res) => {
    const id = req.user._id;
    const { name, photo, phone, bio } = req.body;
    let user;
    try {
        user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ msg: "User Not Found" })
        }
        const updateUser = await User.findByIdAndUpdate(user._id, {
            name: name || user.name,
            email: user.email,
            photo: photo || user.photo,
            phone: phone || user.phone,
            bio: bio || user.bio
        })

        await updateUser.save();

        if (updateUser) {
            return res.status(200).json({
                _id: updateUser._id,
                name: updateUser.name,
                email: updateUser.email,
                photo: updateUser.photo,
                phone: updateUser.phone,
                bio: updateUser.bio
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ msg: "Please provide old Password and new Password" })
    }
    const user = await User.findById(req.user._id);
    if (!user) {
        return res.status(400).json({ msg: "User Not Found" })
    }
    const comparePass = await comparePassword(oldPassword, user.password);
    if (!comparePass) {
        return res.status(400).json({ msg: "password not matched" });
    }
    const newPass = await hashPassword(newPassword);

    const updateUser = await User.findByIdAndUpdate(user._id, {
        name: user.name,
        email: user.email,
        password: newPass,
        phone: user.phone,
        photo: user.photo,
        bio: user.bio
    });

    await updateUser.save();
    return res.status(200).json({ msg: "Password changed successfully" })
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    let user;
    try {
        user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User Not Found" })
        }
        // Delete Token if it exists...........
        const existingToken = Token.findOne({ userId: user._id });
        if (existingToken) {
            await existingToken.deleteOne();
        }
        const resetToken = crypto.randomBytes(32).toString('hex') + user._id;

        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        console.log(hashedToken);

        const token = await Token.create({
            userId: user._id,
            token: hashedToken,
            createdAt: Date.now(),
            expiresAt: Date.now() + 30 * (60 * 1000)
        })
        await token.save();
        if (token) {
            const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

            const message = `<h2>Hello ${user.name}</h2>
                <p>Please use the url belwo to reset password</p>
                <p>This link is valid for only 30 minutes</p>
                <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

                <p>Regards</p>
                <p>Pinvent Team</p>
            `;

            const subject = "Password Reset Request";
            const send_to = user.email;
            const sent_from = process.env.EMAIL_USER;

            try {
                await sendEmail(subject, message, send_to, sent_from);

                res.status(200).json({ success: true, message: "Reset Email Sent" })
            } catch (error) {
                res.status(500).json({ msg: "Email not sent, please try again" })
            }
        }
    } catch (error) {
        console.log(error.message)
    }
}
const resetPassword = async (req, res) => {
    const { password } = req.body;
    const { resetToken } = req.params;

    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    const userToken = await Token.findOne({
        token: hashedToken,
        expiresAt: { $gt: Date.now() },
    });

    if (!userToken) {
        return res.status(404).json({ msg: "Invalid or Expired Token" });
    }
    const hashedPass = await hashPassword(password);
    const user = await User.findOne({ _id: userToken.userId })

    const changePassword = await User.findByIdAndUpdate(user._id, {
        password: hashedPass
    });
    await changePassword.save();
    return res.status(200).json({ msg: "Password Reset Successfully, Please Login" })
}
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword,
}