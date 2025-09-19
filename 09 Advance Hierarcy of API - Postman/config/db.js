const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/Admin_Manager_Emp")

const db = mongoose.connection

db.once("open", (err) => {
    if (err) {
        console.log("Mongoo DB not connect");
        return
    }
    console.log("Database Connected !");
})

module.exports = db