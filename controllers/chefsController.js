//Requiero la constante que conecta con la base de datos y sha1
const connection = require("../config/db");
const sha1 = require("sha1");

//Creo la clase chefsController que contiene el código de todas las rutas relativas a los chefs
class chefsController {
  //Muestra la vista de las estrellas Michelín y su descripción de cada chef
  selectAllChefs(req, res) {
    let sql = `SELECT * FROM chefs`;
    connection.query(sql, (error, resultadoChefs) => {
      if (error) throw error;
      res.render("chefs/allChefs", { resultadoChefs });
    });
  }

  //Muestra la vista de registro de un chef
  createChef(req, res) {
    res.render("chefs/createChef");
  }

  //Ruta post para enviar los datos del formulario de registro de un chef
  postCreateChef(req, res) {
    let {
      name_chef,
      surname,
      email,
      password,
      description_chef,
      phone,
      michelin_star,
      description_star,
    } = req.body;
    let image_chef = req.file.filename;
    let passSha1 = sha1(password);
    let sql = `INSERT INTO chefs (name_chef, surname, email, password, description_chef, phone, image_chef, michelin_star, description_star) VALUES ('${name_chef}', '${surname}', '${email}', '${passSha1}', '${description_chef}','${phone}', '${image_chef}', '${michelin_star}', '${description_star}')`;

    connection.query(sql, (error, resultado) => {
      if (error) throw error;
      res.redirect("/chefs");
    });
  }

  //Muestra a un chef con sus platos. Hay una query para platos y otra para chef.
  //Ruta con dos consultas que se muestran al pulsar el botón Ver más
  //http://localhost:3000/chefs/one/:id
  oneChefWithDishes(req, res) {
    let chef_id = req.params.chef_id;
    let sqlChef = `SELECT * FROM chefs WHERE chef_id = ${chef_id}`;
    let sqlDish = `SELECT * FROM dishes WHERE chef_id = ${chef_id}`;
    connection.query(sqlChef, (error, resultadoChefs) => {
      if (error) throw error;
      connection.query(sqlDish, (error, resultadoDishes) => {
        if (error) throw error;
        res.render("chefs/oneChef", { resultadoChefs, resultadoDishes });
      });
    });
  }
}
module.exports = new chefsController();
