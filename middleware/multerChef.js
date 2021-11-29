const multer = require("multer");

function uploadImageChef(a) {
  const storage = multer.diskStorage({
    //el destino en el que voy a guardar la imagen
    destination: `./public/images/${a}`,
    //el nombre con el que voy a guardar la imagen
    filename: function (req, file, cb) {
      console.log(file);
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const upload = multer({ storage: storage }).single("image_chef");

  return upload;
}

module.exports = uploadImageChef;
