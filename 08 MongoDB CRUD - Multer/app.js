const express = require("express")
const app = express()
const port = 8000
const path = require("path")
const db = require("./config/db")


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded())
app.use('/', require("./routes/index"))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return
    }
    console.log("server run successfuly on  port : ", port);
})