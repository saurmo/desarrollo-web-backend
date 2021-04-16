/**
 * Función de imprimir
 * @param {*} text  Texto a imprimir
 */
const imprimir = (text) => {
  console.log("Texto:", text);
};

const imprimirObjeto = (json) => {
  console.log("Objeto:", json);
};

const imprimirEstudiante = (estudiante) => {
  console.log("Estudiante", estudiante.id);
  imprimir(estudiante.nombre);
};

/**
 * Función para imprimir un estudiantes
 * @param {Object} estudiante Estudiante
 * @param {Function} callback Función de imprmimir
 */
const imprimirEstudianteCallback = (estudiante, callback) => {
  console.log("Estudiante", estudiante.id);
  callback(estudiante);
};

let estudiante = { id: 1, nombre: "Santiago" };
imprimirEstudiante(estudiante);
console.log("");
console.log("Con callback");
imprimirEstudianteCallback(estudiante, imprimir);

//======Ejercicio 2 ============
console.log("");
console.log("Ejercicio 2");
/// Array de objetos
let usuarios = [
  { nombre: "ARROYAVE HERNÁNDEZ JUAN PABLO", id: 1 },
  { nombre: "ATEHORTÚA ZAPATA JADER DANIEL", id: 2 },
  { nombre: "AVILES RUIZ JHON MARIO", id: 3 },
  { nombre: "CANO DUQUE SANTIAGOx", id: 4 },
  { nombre: "ESCUDERO BOWIE EDWARD ANTHONY", id: 5 },
  { nombre: "FORERO HINCAPIÉ SANTIAGO", id: 6 },
  { nombre: "FOX SIERRA SEBASTIÁN", id: 7 },
  { nombre: "FRANCO ALZATE MARÍA ALEJANDRA", id: 8 },
  { nombre: "GÓMEZ LOBO KAREN ANDREA", id: 9 },
  { nombre: "GUZMÁN AGUDELO SEBASTIÁN", id: 10 },
  { nombre: "IGLESIAS MONTOYA MARÍA CAMILA", id: 11 },
];

const obtenerUsuario = (id, callback) => {
  //Buscar el usuario
  let usuario = usuarios.find((x) => x.id == id);
  if (usuario) {
    // Si lo encuentra invoca el callback con el usuario
    callback(usuario);
  } else {
    // sino  invoca el callback con null
    callback(null);
  }
};

// obtenerUsuario(15, (usuario) => {
//   console.log(usuario);
// });

const imprimirUsuario = (usuario) => {
  console.log(usuario);
};

obtenerUsuario(5, (usuario) => {
  console.log(usuario);
});
