//***************************************************************************************************************************************************
//AGREGAR COMENTARIOS

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
// CONTEXTO - SCOPE
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
//FUNCIONES

/**
 *
 * @param {*} estudiante
 */
const imprimirEstudiante = (estudiante) => { };

/**
 *
 * @param {*} estudiante
 */
function imprimirEstudianteYCarrera(estudiante) { }

/**
 *
 */
class Estudiante {
  /**
   *
   * @param {*} estudiante
   */
  imprimirEstudiante(estudiante) { }
}

const FUNCIONES = {
  /**
   *
   * @param {*} estudiante
   */
  imprimirEstudiante(estudiante) { },

  /**
   *
   * @param {*} estudiante
   */
  calcularPromerdio(estudiante) { },
};

//***************************************************************************************************************************************************
//OBJETOS
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
//***************************************************************************************************************************************************
//CONVERSIONES (parseInt, parseFloat)
let edad1 = 50
console.log(parseInt(edad1), parseFloat(edad1));

// Direfencias entre el == & ===
let edad2 = '50'
console.log(edad1 == edad2); // (True) El doble igual compara los valores.
console.log(edad1 === edad2); // (False): El triple igual compara valor y tipo de dato.


//***************************************************************************************************************************************************
//Operadores (>,>=,<,<=.==,===,%,!=,!==,++,--)

//***************************************************************************************************************************************************
//CONCATENACIÓN

let nombre_profesor = 'Santiago'
let apellido_profesor = 'Urrego'
let nombre_completo = nombre_profesor + " " + apellido_profesor
let nombre_completo2 = `${nombre_profesor} ${apellido_profesor}`

console.log(nombre_completo);
console.log(nombre_completo2);

let numero1 = 1
let numero2 = '1'
console.log(numero1 + numero2);

//***************************************************************************************************************************************************
//OPERADOR TERNARIO
let es_mayor_de_edad = false
let edad_persona = 50
if (edad_persona >= 18) {
  es_mayor_de_edad = true
} else {
  es_mayor_de_edad = false
}

// Condicion ? resultado verdadero : resultado false
es_mayor_de_edad = edad_persona >= 18 ? true : false

//***************************************************************************************************************************************************
//Sentencias condicionales (if, if-else, switch)

//***************************************************************************************************************************************************
//Ciclo e iteraciones (for, while, do while)

let persona = {nombre:'Santiago', curso:'DlloWeb'}
// Iterar un Objeto
for (const key in persona) {
  console.log(key);
}
let carreras=['sistemas', 'derecho', 'comunicacion',{name:01}]
// Iterar un array 
for (const carrera of carreras) {
  console.log(carrera);
}

// Iterar un array
carreras.forEach(x => {
  console.log('Foreach',x);
})

//***************************************************************************************************************************************************
//ARRAYS: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array
let numeros=[1,23,25,5,6,]
let cadenas =['sas','sa','li']
let objetos = [{id:0, name:'O'}, {id:1, name:'1'}, {id:2, name:'3'}, {id:4, name:'4'}]
let matriz=[numeros, cadenas, objetos]
console.log(matriz);



