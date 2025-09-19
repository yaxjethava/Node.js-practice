const express = require("express")
const adminCTR = require("../controller/adminCTR")
const adminModel = require("../model/admModel")
const managerModel = require("../model/managerModel")
const authAdmin = require("../config/authAdmin")
const router = express.Router()


router.post("/registartion", adminModel.adminUploadImage, adminCTR.registartion)
router.post("/login", adminCTR.login)
router.get("/profile", authAdmin, adminCTR.profile)
router.post("/changepass", authAdmin, adminCTR.changePassword)
router.post("/forgetpassword", adminCTR.forgetPassword)
router.post("/checkotp", adminCTR.checkotp)
router.post("/managerregistration", authAdmin, managerModel.managerImageUpload, adminCTR.managerRegistration)

module.exports = router