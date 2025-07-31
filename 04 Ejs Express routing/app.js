const express = require("express");
const app = express();
const path = require("path")
const port = 8000;

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    return res.render("home")
})

app.get('/about', (req, res) => {
    return res.render("about")
})
app.get('/blog', (req, res) => {
    return res.render("blog")
})
app.get('/*"*"', (req, res) => {
    return res.render("404")
})


app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Success server run on port : ", port);
})