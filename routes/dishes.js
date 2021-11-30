//Requiero todas las constantes que necesito
const express = require("express");
const uploadImageDish = require("../middleware/multerDish");
const connection = require("../config/db");
const router = express.Router();
const dishesController = require("../controllers/dishesController");
const sha1 = require("sha1");

//En esta ruta se muestran todos los platos indicando su chef creador, ya que hago una query vinculando ambas tablas (cada plato con su chef). (NAVBAR: Platos)
//localhost:3000/dishes/
router.get("/", dishesController.allDishes);

//Ruta get para crear un nuevo plato y ruta post a continuación para enviar esos datos
//localhost:3000/dishes/newDish
router.get("/newDish", dishesController.createDish);

//localhost:3000/dishes/createDish
//Ruta post para enviar el plato creado. He tenido que crear un multer propio
//para ello y otra función multer para crear chefs. En el body, incluyo el
//chef.id además del nombre y la descripción del plato porque en el cuestionario para crear un plato, he hecho un bucle en el select que recoge al chef por id.
//Tras crear el nuevo plato, se redirecciona al usuario a la vista de un chef.
router.post(
  "/createDish",
  uploadImageDish("dishes"),
  dishesController.postCreateDish
);

//localhost:3000/dishes/deleteDish/:chef_id/:dish_id
//Ruta para borrar un plato
router.get("/deleteDish/:chef_id/:dish_id", dishesController.deleteDish);

//localhost:3000/dishes/mostrarFormulario/:dish_id
//En esta ruta se renderiza la vista de editar plato. La query trae consigo
//el id del chef al estar vinculadas las dos tablas en la base de datos
router.get("/mostrarFormulario/:dish_id", dishesController.getEditDish);

//En esta ruta se guardan los cambios del plato y se envían (post). La ruta post es la que se vincula a la vista del formulario de editDish.
//Tanto el id del chef como del plato son parámetros dinámicos que debo recoger
//en el req.params para que ambos sigan vinculados. De esta forma, al cambiar
//los datos de un plato continúa estando vinculado a su chef y la ruta redirecciona al usuario a la vista de ese chef.
//localhost:3000/dishes/guardar_cambios_dish/:dish_id
router.post(
  "/guardar_cambios_dish/:chef_id/:dish_id",
  dishesController.postEditDish
);

module.exports = router;
