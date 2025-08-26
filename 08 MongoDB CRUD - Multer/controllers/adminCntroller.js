const Admin = require('../models/adminTblModal')
const fs = require("fs")
const path = require("path")

module.exports.home = async (req, res) => {

    try {
        const data = await Admin.find({})
        res.render("home", { records: data })
    } catch (err) {
        console.log(err);
        return res.render("404")
    }
}

module.exports.addUser = async (req, res) => {
    
    
    const { name, age, gender, hobby, email, password, city } = req.body
    console.log(req.file);
    const image = req.file ? req.file.path : "";

    try {

        const userCreated = await Admin.create({
            name,
            age,
            gender,
            hobby,
            email,
            password,
            city,
            image
        })

        if (userCreated) {

            console.log("Data add successfuly");
            res.redirect("/")
        }
        console.log(userCreated);


    } catch (err) {
        console.error(err);
        return res.render('404');
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Admin.findByIdAndDelete(id)

        if (!user) {
            console.log("user not found");
            res.render("404")
        }

        console.log("Deleted susseccfuly");
        res.redirect("/")

    } catch (error) {
        console.log(error);
        res.render("404")
    }
}

module.exports.editUser = async (req, res) => {
    try {

        const id = req.params.id
        const singalUser = await Admin.findById(id)
        res.render("edit", { singalUser, id })
        console.log("Sigal user for edit : ", singalUser);

    } catch (e) {
        console.log(e);
        res.render('404')
    }
}

module.exports.updatedUser = async (req, res) => {

    try {

        const id = req.params.id
        const { name, age, gender, hobby, email, password, city } = req.body
        const updateUser = await Admin.findByIdAndUpdate(id, {
            name,
            age,
            gender,
            hobby,
            email,
            password,
            city
        })

        if (!updateUser) {
            console.log("user not found");
            res.render("404")
        }
        res.redirect("/");

    } catch (error) {
        console.log(error);
        res.render("404")
    }

}