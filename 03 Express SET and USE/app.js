const express = require("express");
const app = express()
const port = 8000

app.set("title","<h1>Yaxxx home</h1>")

app.get('/', (req, res) => {
    res.send(app.get('title'))
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return

    }
    console.log("Server running success on port : ", port);

})