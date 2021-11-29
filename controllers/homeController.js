//Requiero la constante que conecta con la base de datos y sha1
const connection = require("../config/db");
const sha1 = require("sha1");

class homeController {
  //Bucle con todos los chefs. Es la página principal de la aplicacion. Nos aparecerá tambien cuando pinchemos en home.
  //localhost:3000/home (sin complemento)
  allChefs(req, res) {
    let sqlChefs = `SELECT * FROM chefs`;
    connection.query(sqlChefs, (error, resultadoChefs) => {
      if (error) throw error;
      res.render("home", { resultadoChefs });
    });
  }
  //Ruta get para hacer el login
  //Renderiza la vista login que contiene el formulario de login
  //localhost:3000/home/login
  getLogin(req, res) {
    res.render("login/login");
  }
  //Ruta post para enviar los datos de login. La query comprueba que el email y el password coincidan. Se vuelve a encriptar la contraseña.
  //Si el resultado del array es distinto a 0 renderizará la vista de error del login y sino redireccionará a la ruta del chef que ha introducido sus datos
  //localhost:3000/home/send/login
  postLogin(req, res) {
    let { email, password } = req.body;
    let passSha1 = sha1(password);
    let sql = `SELECT * FROM chefs WHERE email = '${email}' AND 
        password = '${passSha1}'`;
    connection.query(sql, (error, resultado) => {
      if (error) throw error;
      if (!resultado[0]) {
        res.render("login/errorLogin");
      } else {
        res.redirect(`/chefs/one/${resultado[0].chef_id}`);
      }
    });
  }
}

module.exports = new homeController();
