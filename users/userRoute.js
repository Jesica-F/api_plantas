const { createUser, getAllUsers, getUserById, updateUser, deleteUser, login } = require("./userComtrollers");

const router = require("express").Router();
const { validatorCreateUser } = require("../validator/users")

router.post("/register", validatorCreateUser, createUser)
router.post("/login", login)
router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)
module.exports = router