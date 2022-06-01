require("dotenv").config();
require("./MongoDB/config");

const express = require("express");
const path = require('path');
const hbs = require("express-handlebars");
const PORT = process.env.PORT || 3030

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));


server.set("view engine", "hbs");
server.set("views", path.join(__dirname, "views"))
server.engine("hbs", hbs.engine({ extname: "hbs" }))


server.use("/users", require("./users/userRoute"))
server.use("/posts", require("./posts/postRoute"))





server.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`API running on http://localhost:${PORT}`)
})