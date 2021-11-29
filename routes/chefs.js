var express = require("express");
var router = express.Router();
const connection = require("../config/db");
const uploadImageChef = require("../middleware/multerChef");
const chefsController = require("../controllers/chefsController");
const sha1 = require("sha1");

//localhost:3000/chefs/
router.get("/", chefsController.selectAllChefs);

//localhost:3000/chefs/createChef
//Registrarse un chef
router.get("/createChef", chefsController.createChef);

//localhost:3000/chefs
//Ruta post crear chefs. He tenido que crear una función multer para chef quitando el campo imagen de la base de datos de la "deconstrucción" porque la imagen no procede de la base de datos sino que es una nueva imagen que se introduce en el cuestionario de creación.
//El password se encripta para que no aparezcan los datos reales en la base de datos en el volcado.
router.post("/", uploadImageChef("chefs"), chefsController.postCreateChef);

//Información del chef y sus platos
//localhost:3000/chefs/one/:chef_id

router.get("/one/:chef_id", chefsController.oneChefWithDishes);

module.exports = router;
