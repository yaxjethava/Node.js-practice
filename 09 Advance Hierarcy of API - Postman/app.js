const express = require("express")
const app = express()
const port = 8008
const db = require("./config/db")
const nodemailer = require("nodemailer");
var cookiesParser = require("cookie-parser")

app.use(cookiesParser())
app.use(express.urlencoded({ extended: true }))
app.use("/", require("./routes/index"))

app.listen(port, (err) => {
    if (err) {
        console.log("Server can't runing");
        return false
    }
    console.log(`Server run successfully run on http://localhost:${port} `);
})