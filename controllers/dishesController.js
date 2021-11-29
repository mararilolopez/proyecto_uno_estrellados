const connection = require("../config/db");
const sha1 = require("sha1");

class dishesController {
  //Muestra la vista de todos los platos vinculándolo a su chef creador
  //La query vincula las dos tablas para que cada plato salga asociado a su chef.
  //Resultado total muestra la vista asociada a esta ruta.
  //localhost:3000/dishes/
  allDishes(req, res) {
    let sql = `SELECT * FROM chefs, dishes where chefs.chef_id = dishes.chef_id;`;
    connection.query(sql, (error, resultadoTotal) => {
      if (error) throw error;
      res.render("dishes/allDishes", { resultadoTotal });
    });
  }

  //GET CREAR PLATO
  //localhost:3000/dishes/newDish
  createDish(req, res) {
    let sqlChefs = `SELECT * FROM chefs`;
    connection.query(sqlChefs, (error, resultadoChefs) => {
      if (error) throw error;
      res.render("dishes/oneDish", { resultadoChefs });
    });
  }
  //POST CREAR PLATO
  //localhost:3000/dishes/createDish
  postCreateDish(req, res) {
    let { name_dish, description_dish, chef_id } = req.body;
    let image_dish = req.file.filename;
    let sql = `INSERT INTO dishes (name_dish, description_dish, image_dish, chef_id) VALUES ('${name_dish}', '${description_dish}', '${image_dish}', '${chef_id}')`;
    connection.query(sql, (error, resultado) => {
      if (error) throw error;
      res.redirect(`/chefs/one/${chef_id}`);
    });
  }

  //BORRAR PLATO
  //(al haber foreign key debo relacionar el chef id con el dish id para el borrado y meter ambos como parámetros dinámicos) en la ruta
  //localhost:3000/dishes/deleteDish/:chef_id/:dish_id
  //Se redirecciona al usuario a la vista del chef en cuestión
  deleteDish(req, res) {
    let { chef_id, dish_id } = req.params;

    let sql = `DELETE FROM dishes WHERE dish_id = ${dish_id}`;
    connection.query(sql, (error, resultado) => {
      if (error) throw error;
      res.redirect(`/chefs/one/${chef_id}`);
    });
  }

  //En esta ruta se renderiza la vista de editar plato. La query trae consigo el id del chef al estar vinculadas las dos tablas en la base de datos
  //router.get("/mostrarFormulario/:dish_id"
  getEditDish(req, res) {
    let { dish_id } = req.params;
    let sql = `SELECT * FROM dishes WHERE dish_id = ${dish_id}`;
    connection.query(sql, (error, resultadoDishes) => {
      if (error) throw error;
      res.render("dishes/editDish", { resultadoDishes });
    });
  }

  //En esta ruta se guardan los cambios del plato y se envían (post). La ruta post es la que se vincula a la vista del formulario de editDish.
  //Tanto el id del chef como del plato son parámetros dinámicos que debo recoger
  //en el req.params para que ambos sigan vinculados. De esta forma, al cambiar
  //los datos de un plato continúa estando vinculado a su chef y la ruta redirecciona al usuario a la vista de ese chef.
  //localhost:3000/dishes/guardar_cambios_dish/:dish_id
  postEditDish(req, res) {
    let { dish_id, chef_id } = req.params;
    let { name_dish, description_dish } = req.body;
    let sql = `UPDATE dishes SET name_dish = '${name_dish}',
         description_dish = '${description_dish}' WHERE dish_id = ${dish_id}`;
    connection.query(sql, (error, resultado) => {
      if (error) throw error;
      res.redirect(`/chefs/one/${chef_id}`);
    });
  }
}

module.exports = new dishesController();
