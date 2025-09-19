const adminModel = require("../model/admModel");
const managerModel = require("../model/managerModel")
const nodemailer = require("nodemailer");
const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.registartion = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);

        const emailExist = await adminModel.findOne({ email: req.body.email })
        //checking existing email ou user
        if (!emailExist) {

            //checking massword is match from frontend
            if (req.body.password == req.body.con_password) {

                if (req.file) {
                    req.body.image = adminModel.adminImagePath + "/" + req.file.filename
                }
                //make hash password 
                req.body.password = await bcrypt.hash(req.body.password, 10);
                req.body.created_date = Date.now();
                req.body.updated_date = Date.now();

                const createdAdmin = await adminModel.create(req.body)
                return res
                    .status(201)
                    .json({ message: "Admin registed successfully ! !", data: createdAdmin })

            } else {
                return res.status(200).json({ message: "Password does't match ! !" })
            }

        } else {
            return res.status(200).json({ message: "Same email id already Exiest ! !" })
        }

    } catch (error) {
        return res.status(400).json({ message: "Server error of Admin Registration" })
    }
}

module.exports.login = async (req, res) => {
    try {

        const checkUser = await adminModel.findOne({ email: req.body.email })

        // email is exist , checker
        if (checkUser) {

            //compre fontend and database password
            const checkPassword = await bcrypt.compare(req.body.password, checkUser.password)

            //after password true , make token 
            if (checkPassword) {

                const token = jwt.sign({ admin: checkUser }, ".X", { expiresIn: "1h" })
                return res.status(200).json({ message: "Admin Login successfully ! !", data: token });

            } else {
                return res.status(200).json({ message: "Admin password not match" });
            }

        } else {
            return res.status(200).json({ message: "Admin not exist !. please, Register" });
        }

    } catch (error) {
        return res.status(200).json({ message: "Internal server error in login", error: error.message });
    }
}

module.exports.profile = async (req, res) => {
    try {
        const adminData = req.user
        console.log('profile is running');
        return res.status(200).json({ message: "profile is running !", adminData });

    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Internal server error in login", error: error.message });
    }
}

module.exports.changePassword = async (req, res) => {
    try {
        console.log(req.body);
        const takeOldPassword = req.user.admin.password
        const checkCurrentPass = await bcrypt.compare(req.body.c_password, takeOldPassword)

        if (checkCurrentPass) {
            if (req.body.new_password != req.body.confirm_password) {

                return res.status(200).json({ message: "Confirm password does't mathch !" });
            }

            const hashPassword = await bcrypt.hash(req.body.new_password, 10);
            const updatePass = await adminModel.findByIdAndUpdate(req.user.admin._id, { password: hashPassword })

            return res.status(200).json({ message: "Password changed Successfully !!", data: updatePass });

        } else {
            return res.status(400).json({ message: "Current password is not match !!" });
        }

    } catch (error) {
        return res.status(400).json({ message: "Internal server error !!", error: error.message })
    }
}

module.exports.forgetPassword = async (req, res) => {
    try {

        const checkEmail = await adminModel.findOne({ email: req.body.email });
        const OTP = Math.floor(100000 + Math.random() * 900000);


        if (checkEmail) {

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "jethavayax99@gmail.com",
                    pass: "zkzseceewutnwnzh",
                },
            });

            const info = await transporter.sendMail({
                from: "jethavayax99@gmail.com",
                to: req.body.email,
                subject: "Change Password OTP",
                text: "OTP is : otppp ",
                html: `<b>OTP is : ${OTP}</b>`
            })
            console.log("Message sent:", info);

            // cookies expired in 5 minites
            res.cookie("OTP", OTP, { maxAge: 5 * 60 * 1000 });
            return res.status(200).json({ message: "OTP send successfully !", otp: OTP })
        } else {
            return res.status(400).json({ message: "Email not exist, try other email !!" })
        }

    } catch (error) {
        return res.status(400).json({ message: "Internal server error !!", error: error.message })
    }
}

module.exports.checkotp = async (req, res) => {
    try {
        const entredOTP = req.body.otp;
        const cookieOtp = req.cookies.OTP;

        if (!cookieOtp) {
            return res.status(400).json({ message: "OTP expried please click on resend OTP" })
        };
        if (entredOTP == cookieOtp) {
            res.clearCookie("OTP");
            return res.status(200).json({ message: "OTP verified successfully !" })
        } else {
            return res.status(400).json({ message: "OTP in not verified" })
        }

    } catch (error) {
        return res.status(400).json({ message: "Internal server error !!", error: error.message })
    }
}

module.exports.managerRegistration = async (req, res) => {
    try {
        const checkEmail = await managerModel.findOne({ email: req.body.email });

        // if email not exist , so check the both passwords
        if (!checkEmail) {

            //if passwords are same, so make the managers details
            if (req.body.password == req.body.con_password) {

                //store plain password for sending in email
                const password = req.body.password;

                req.body.password = await bcrypt.hash(req.body.password, 10)

                req.body.image = managerModel.managerImagesPath + "/" + req.file.filename;
                req.body.status = "Active";
                req.body.created_date = Date.now();
                req.body.updated_date = Date.now();

                console.log(req.body);

                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: "jethavayax99@gmail.com",
                        pass: "zkzseceewutnwnzh",
                    }
                })

                const info = await transporter.sendMail({
                    from: "jethavayax99@gmail.com",
                    to: req.body.email,
                    subject: "Manager created successfully !",
                    text: "Manager login details",
                    html: `<b>Manager login details :<br> Email : ${req.body.email}<br>User name : ${req.body.userName}<br>Password : ${password}</b>`
                })

                if (info) {
                    const createManager = await managerModel.create(req.body)
                    return res.status(201).json({ message: `${req.body.userName} as manager is created!`, manager: createManager })
                } else {
                    return res.status(400).json({ message: "Manager not created !! can't send the email" })
                }

            } else {
                return res.status(200).json({ message: "Password not match !!" })
            }

        } else {
            return res.status(400).json({ message: "Email already exist, try using another Email !!" })
        }


    } catch (error) {
        return res.status(400).json({ message: "Internal server error !!", error: error.message });
    }
}