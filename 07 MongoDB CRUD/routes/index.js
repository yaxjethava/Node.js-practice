const express = require("express")
const adminCtrl = require("../controllers/adminCntroller")
const routes = express.Router()

routes.get('/', adminCtrl.home)
routes.post('/addUser', adminCtrl.addUser)
routes.get('/deleteUser/:id', adminCtrl.deleteUser)
routes.get('/editUser/:id', adminCtrl.editUser)
routes.post('/updateUser/:id', adminCtrl.updatedUser)

module.exports = routes