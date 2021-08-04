//***************************************************************************************************************************************************
//Agregar comentarios

//Comentaria de linea

// Edad de una persona
let edad = 30;

/**
 * Calcular la edad de una persona para guardar en base de datos
 * @param {Date} fecha_vencimiento Fecha de vencimiento en el formato DD/MM/YYYY
 * @returns Número entero con la edad
 * @author Santiago Urrego Morales
 * @version 1.0.0
 *
 */
const calcularEdad = (fecha_vencimiento) => {
  let edad = 0;
  if (fecha_vencimiento != null) {
    // edad = null;
  }
  return edad;
};

//***************************************************************************************************************************************************
// Constante
const VERSION = "1.0.0";
// Variable
let nombre = "Santiago";

//***************************************************************************************************************************************************
// Contexto - Scope
// Contexto global
// La variable edad esta en un contexto global

// Contexto local
// La variable edad dentro del método calcularEdad es una variable local

//***************************************************************************************************************************************************
// Tipos de datos (string, number, boolean, null, undefined, object, array)
// Javascript es un lenguaje no tipado
let nombre_carrera = "Sistemas";
let promedio_carrera = 4.2;
let carrera_habilitada = true;
let numero_estudiantes = 11;
let decano_facultad;

//***************************************************************************************************************************************************
//Imprimir en consola
// console.log()
console.log(nombre_carrera);
console.log(promedio_carrera);
console.log(carrera_habilitada);
console.log(numero_estudiantes, decano_facultad);
console.error();
console.info();
console.warn();

//***************************************************************************************************************************************************
//Función typeof
// Saber que tipo de datos es una variable
console.log(typeof nombre_carrera);
console.log(typeof promedio_carrera);
console.log(typeof carrera_habilitada);
console.log(typeof numero_estudiantes);
console.log(typeof decano_facultad);

//***************************************************************************************************************************************************
//Funciones

/**
 *
 * @param {*} estudiante
 */
const imprimirEstudiante = (estudiante) => {};

/**
 *
 * @param {*} estudiante
 */
function imprimirEstudianteYCarrera(estudiante) {}

/**
 *
 */
class Estudiante {
  /**
   *
   * @param {*} estudiante
   */
  imprimirEstudiante(estudiante) {}
}

const FUNCIONES = {
  /**
   *
   * @param {*} estudiante
   */
  imprimirEstudiante(estudiante) {},

  /**
   *
   * @param {*} estudiante
   */
  calcularPromerdio(estudiante) {},
};

//***************************************************************************************************************************************************
//Objetos
// JSON (Javascript Object Notation)
// key:value
let estudiante = {
  nombre: "Santiago",
  id_carrera: 4002,
  fecha_vencimiento: "01/01/1990",
  calcularPrecioSemestre: () => {
    console.log("Método calcularPrecioSemestre");
  },
  calcularPromedioGeneral() {
    console.log("Método calcularPromedioGeneral");
  },
};

//Capturar u obtener la fecha de vencimiento del JSON estudiante
let fecha_vencimiento = estudiante.fecha_vencimiento;
//Capturar u obtener la fecha de vencimiento del JSON estudiante (2 FORMA )
let fecha_vencimiento2 = estudiante["fecha_vencimiento"];

// Agregar o modificar una propiedad al JSON de estudiante
estudiante.edad = calcularEdad(fecha_vencimiento);
// Agregar o modificar una propiedad al JSON de estudiante (2 FORMA)
estudiante["edad2"] = calcularEdad(fecha_vencimiento);
console.log(estudiante);

for (const key in estudiante) {
  console.log(key);
  //  estudiante[key] = null;
}
estudiante.calcularPrecioSemestre();
estudiante.calcularPromedioGeneral();

let carrera = new Object();

//Conversiones (parseInt, parseFloat)
//Operadores (>,>=,<,<=.==,===,%,!=,!==,++,--)
//Concatenación
//Operador ternario
//Sentencias condicionales (if, if-else, switch)
//Ciclo e iteraciones (for, while, do while)
//Arrays
