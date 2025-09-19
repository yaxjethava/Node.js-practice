const mongoose = require("mongoose")
const multer = require("multer")
let adminImagePath = "uploads/adminImage"

const AdminSchema = new mongoose.Schema({
    userName: {
        type: String,
        requires: true
    },
    phone: {
        type: String,
        requires: true
    },
    email: {
        type: String,
        requires: true
    },
    password: {
        type: String,
        requires: true
    },
    image: {
        type: String,
        requires: true
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    },
    created_date: {
        type: Date,
        requires: true
    },
    updated_date: {
        type: Date,
        requires: false
    }
})



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, adminImagePath)
        console.log("model runn");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


AdminSchema.statics.adminUploadImage = multer({ storage: storage }).single("image")
AdminSchema.statics.adminImagePath = adminImagePath

const AdminModel = mongoose.model("Admin", AdminSchema)
module.exports = AdminModel