const mongoose = require("mongoose");
const multer = require("multer");
const managerImagesPath = "uploads/managerImages";

const managerSchema = new mongoose.Schema({
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

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, managerImagesPath)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

managerSchema.statics.managerImagesPath = managerImagesPath;
managerSchema.statics.managerImageUpload = multer({ storage: fileStorage }).single("image");

const managerModel = mongoose.model("Manager", managerSchema);
module.exports = managerModel;