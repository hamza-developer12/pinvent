const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

const contactUs = async (req, res) => {
    const { subject, message } = req.body;
    // const user = await User.findById(req.user.id);

    // if (!user) {
    //     return res.status(400).json({ msg: "User Not Found" })
    // }
    // Contact Validation.........
    if (!subject || !message) {
        return res.status(400).json({ msg: "Please fill all the fields" })
    }

    const send_to = process.env.EMAIL_USER;
    const sent_from = process.env.EMAIL_USER;
    const reply_to = "hamzaazam141@gmail.com";
    try {
        await sendEmail(subject, message, send_to, sent_from, reply_to);
        res.status(200).json({ msg: "Email sent" })
    } catch (error) {
        return res.status(500).json({ msg: "Email not sent, please try again" })
    }
}
module.exports = contactUs