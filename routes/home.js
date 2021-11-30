var express = require("express");
var router = express.Router();
const connection = require("../config/db");
const sha1 = require("sha1");
const uploadImageChef = require("../middleware/multerChef");
const homeController = require("../controllers/homeController");

//Ruta de home (todos los chefs)
//localhost:3000/home (sin complemento)
router.get("/", homeController.allChefs);

//Ruta para loguin
//localhost:3000/home/login

router.get("/login", homeController.getLogin);

/* router.get("/login", (req, res) => {
  res.render("login/login");
}); */

//localhost:3000/home/send/login
//Ruta post para enviar los datos introducidos por el chef para loguearse

router.post("/send/login", homeController.postLogin);

module.exports = router;
