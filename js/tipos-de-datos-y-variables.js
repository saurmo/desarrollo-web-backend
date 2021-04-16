/**
 * ============DECLARACION DE VARIABLES ============
 * VAR: Scope global (1er tipo de variable de js)
 * LET: Scope local o de bloque (es6)
 * CONST: Variables que no se les cambia el valor
 */

const VERSION = "1.0.0";
const ESTADOS = ["SUCCESS", "REJECTED", "PENDING"];

var edad = 20;
let nombre = "Santiago";

if (edad >= 20) {
  var edad = 21;
  let nombre = "Carlos";
  //   console.log("Bloque del if", edad);
  console.log("Bloque del if", nombre);
}
console.log("Bloque general", nombre);

//==================TIPO DE DATOS==============
console.log("");
let correo = "saurrego@udem.edu.co"; // string
let id = 1036; // number
let estatura = 1.75; // float
let carreras = ["SISTEMAS", "DERECHO"]; // array de numbers, json, arrays, bool
let es_estudiante = true; // [true, false]

//json (Javascript Object Notation)

//JSON de estudiante
let estudiante = {
  nombre: "Santiago",
  apellido: "urrego",
};

//json de funciones
let metodos = {
  //Función
  crear: function (params) {
    console.log("Crear");
  },
  // Función flecha ó lamda ó arrow function
  modificar: () => {
    console.log("modificar");
  },

  // Abreviado
  consultar() {
    console.log("consultar");
  },
};

metodos.consultar();
metodos.crear();
metodos.modificar();
