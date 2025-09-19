const express = require("express")

const router = express.Router()

router.use("/admin", require("./adminRoutes"))

module.exports = router