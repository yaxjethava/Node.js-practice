const express = require("express")
const adminCtrl = require("../controllers/adminCntroller")

const multer = require("multer")
const routes = express.Router()

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
console.log(fileStorage);

const upload = multer({ storage: fileStorage }).single('image')

routes.get('/', adminCtrl.home)
routes.post('/addUser', upload, adminCtrl.addUser)
routes.get('/deleteUser/:id', adminCtrl.deleteUser)
routes.get('/editUser/:id', upload, adminCtrl.editUser)
routes.post('/updateUser/:id', adminCtrl.updatedUser)

module.exports = routes