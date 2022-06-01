const User = require("./userModel")
const { hashPassword, checkPassword } = require("../utils/handlePassword")

const createUser = (req, res) => {

    const newUser = new User({...req.body.password })
    const password = hashPassword(req.body.password)
    newUser.save((error, result) => {
        if (error) {
            res.status(400).json(error)
        } else {
            res.status(200).json(result)
        }
    })
}

const login = async(req, res, next) => {
    const dbResponse = await loginUser(req.body.email)
    if (!dbResponse.length) return next();
    if (await checkPassword(req.body.password, dbResponse[0].password)) {
        res.status(200).json({ message: "Ok" })
    } else {
        let error = new Error
        error.status = 401
        error.message = "Unauthorized"
        next(error)
    }
}

//GET ALL USER
const getAllUsers = (req, res) => {
    User.find()
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {
            res.status(404).json(err)
        })
}

//GET USER BY ID

const getUserById = async(req, res) => {
    try {
        const result = await User.findById(req.params.id)
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json(error)
    }
}

//UPDATE USER
const updateUser = async(req, res) => {
    try {
        const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json(error)
    }
}



//DELETE USER
const deleteUser = async(req, res) => {
    try {
        const result = await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(202).json(result)
    } catch (error) {
        res.status(404).json(error)
    }
}


module.exports = { createUser, login, getAllUsers, getUserById, updateUser, deleteUser }