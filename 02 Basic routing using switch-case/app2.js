const http = require("http")
const fs = require("fs")
const port = 8000


const handelServer = (req, res) => {

    let file = '';

    switch (req.url) {
        case '/':
            file = "Home.html"
            break;
        case '/about':
            file = "About.html"
            break;
        case '/blog':
            file = "Blog.html"
            break;
        case '/contact':
            file = "Contact.html"
            break;
        default:
            file = "404.html"
    }

    fs.readFile(`./views/${file}`, 'utf8', (err, data) => {

        if (err) {
            console.log("File readr Error" + err)
            return;
        }
        res.end(data)
    })
}

const server = http.createServer(handelServer)

server.listen(port, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(`SUCCESS : http://localhost:${port}`)
})