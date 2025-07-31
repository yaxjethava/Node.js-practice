const http = require("http")
const fs = require("fs")
const path = require("path")
const port = 5000


const handelServer = ((req, res) => {

    let file = ''

    switch (req.url) {
        case '/':
            file = 'Home.html'
            break;

        case '/about':
            file = 'About.html'
            break;

        case '/blog':
            file = 'Blog.html'
            break;

        case '/contact':
            file = 'Contact.html'
            break;

        default:
            file = "404.html"
    }

    fs.readFile(path.join(__dirname, "views", file), ((err, data) => {

        if (err) {
            console.log("The file gives the error  :" + err)
            return
        }

        res.end(data)
    }))

})

const server = http.createServer(handelServer)

server.listen(port, (err) => {
    if (err) {
        console.log(err)
        return
    }

    console.log(`File runing on : http://localhost:${port}`)
})