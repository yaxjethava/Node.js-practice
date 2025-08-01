const express = require("express")
const app = express()
const port = 8000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));

let taskArr = ['HomeWord']

app.get("/", (req, res) => {
    return res.render('home', { taskArr })
})

app.post("/addData", (req, res) => {
    console.log(req.body)
    taskArr.push(req.body.task)
    return res.redirect('/')
})

app.get("/delete/:id", (req, res) => {
    let id = req.params.id
    taskArr.splice(id, 1)
    return res.redirect('/')
})

app.get("/editData/:id", (req, res) => {
    let id = req.params.id
    const singleTask = taskArr[id]
    console.log(singleTask);

    return res.render('editPage', { singleTask, id })
})

app.post("/editedData/:id", (req, res) => {
    let id = req.params.id
    taskArr[id] = req.body.task
    return res.redirect('/')
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return
    }
    console.log("Server run successfuly on port : ", port);

})
