const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/CRUD_DEMO_1")

const db = mongoose.connection;

db.once("open", (err) => {
    if (err) {
        console.log("MongoDB Err : ", err);
        return
    }

    console.log("databse is connected succesfuly !");

})