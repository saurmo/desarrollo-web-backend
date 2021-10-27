const Handlebars = require("handlebars");


const render = (plantilla, datos) => {
    const template = Handlebars.compile(plantilla);
    return template(datos);


}

module.exports={render}