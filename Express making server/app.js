const express = require("express")
const app = express()
const path = require("path")
const fs = require('fs')

const port = 8000

app.get('/', (req, res) => {

    fs.readFile(path.join(__dirname, 'views', 'index.html'), 'utf8', ((err, data) => {
        if (err) {
            console.log(err);
            return
        }
        res.end(data)
    }))

})

app.get('/about', (req, res) => {

    fs.readFile(path.join(__dirname, 'views', 'about.html'), 'utf8', ((err, data) => {
        if (err) {
            console.log(err);
            return
        }
        res.end(data)
    }))
})

app.get('/blog', (req, res) => {

    fs.readFile(path.join(__dirname, 'views', 'blog.html'), 'utf8', ((err, data) => {
        if (err) {
            console.log(err);
            return
        }
        res.end(data)
    }))
})
app.get('/*"*"', (req, res) => {

    fs.readFile(path.join(__dirname, 'views', '404.html'), 'utf8', ((err, data) => {
        if (err) {
            console.log(err);
            return
        }
        res.end(data)
    }))
})


app.listen(port, (err) => {
    if (err) {
        console.log((err));
    }
    console.log('Server run successuly on port :', port);
})

