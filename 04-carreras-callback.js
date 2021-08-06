
const CARRERAS =
    [
        { "estudiantes":50, "nombre": "SISTEMAS", },
        { "estudiantes":40, "nombre": "DERECHO", },
        { "estudiantes":70, "nombre": "COMUNICACION", },
        { "estudiantes":80, "nombre": "CIVIL", },
        { "estudiantes":100, "nombre": "AMBIENTAL", },
        { "estudiantes":60, "nombre": "PSICOLOGIA", },
        { "estudiantes":90, "nombre": "FINANCIERA", },
       
    ]
/**
 * ACTIVIDAD
 * Crear una funcion que capture el nombre de una carrera. Y la funcion debe
 * de buscar en la base de datos el numero de estudiantes e imprimir en consola
 */

 const obtenerCarrera = (nombre, callback) => {
     let carrera =  CARRERAS.find(x=>x.nombre == nombre)
     callback(carrera)
 }

 const imprimirCarrera = (c) => console.log(c);
 
 obtenerCarrera('FINANCIERA',     (c)=> console.log(c)     )
 obtenerCarrera('FINANCIERA',     imprimirCarrera     )