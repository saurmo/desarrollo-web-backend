
const ESTUDIANTES =
[
    { id_carrera:1, "nombre": "Carlos Ángel", "apellidos": "González Giraldo", "id": 1020497009, "email": "cgonzalez009@soyudemedellin.edu.co" },
    { id_carrera:2, "nombre": "Diego", "apellidos": "Álvarez Atamiranda", "id": 1039102082, "email": "diego-980910@outlook.com" },
    { id_carrera:3, "nombre": "Juan Pablo", "apellidos": "Moscoso Mesa", "id": 1037659569, "email": "jmoscoso569@soyudemedellin.edu.co" },
    { id_carrera:4, "nombre": "Sebastián Jair", "apellidos": "Murillo Viafara", "id": 1000018690, "email": "smurillo690@soyudemedellin.edu.co" },
    { id_carrera:1, "nombre": "Jean Marco", "apellidos": "Pedraza Zapata", "id": 1001687235, "email": "jpedraza235@soyudemedellin.edu.co" },
    { id_carrera:4, "nombre": "Santiago", "apellidos": "Escobar Escobar", "id": 1193413639, "email": "sescobar639@soyudemedellin.edu.co" },
    { id_carrera:5, "nombre": "Mateo", "apellidos": "Martínez Marulanda", "id": 1000874985, "email": "mmartinez985@soyudemedellin.edu.co" },
    { id_carrera:6, "nombre": "Mateo", "apellidos": "Rivera Arias", "id": 1000903050, "email": "mrivera050@soyudemedellin.edu.co" },
    { id_carrera:7, "nombre": "Michael Stev", "apellidos": "Cardenas Quintero", "id": 1040260872, "email": "mcardenas872@soyudemedellin.edu.co" },
    { id_carrera:1, "nombre": "Alexis", "apellidos": "Patiño Agudelo", "id": 1000206832, "email": "apatino832@soyudemedellin.edu.co" },
    { id_carrera:2, "nombre": "Alexander", "apellidos": "Restrepo Múnera", "id": 1000918870, "email": "arestrepo870@soyudemedellin.edu.co" },
    { id_carrera:4, "nombre": "Santiago", "apellidos": "Posada Bernal", "id": 1010027176, "email": "sposada176@soyudemedellin.edu.co" },
    { id_carrera:4, "nombre": "Kevin Eduardo", "apellidos": "Valencia Rivas", "id": 1077454424, "email": "kvalencia424@soyudemedellin.edu.co" },
    { id_carrera:5, "nombre": "Santiago", "apellidos": "Urrego Morales", "id": 1036955282, "email": "saurrego@udem.edu.co" },
]
const CARRERAS =
    [
        { id: 1, "estudiantes": 50, "nombre": "SISTEMAS", },
        { id: 2, "estudiantes": 40, "nombre": "DERECHO", },
        { id: 3, "estudiantes": 70, "nombre": "COMUNICACION", },
        { id: 4, "estudiantes": 80, "nombre": "CIVIL", },
        { id: 5, "estudiantes": 100, "nombre": "AMBIENTAL", },
        { id: 6, "estudiantes": 60, "nombre": "PSICOLOGIA", },
        { id: 7, "estudiantes": 90, "nombre": "FINANCIERA", },
    ]
/**
 * ACTIVIDAD
 * Crear una funcion que capture el nombre de una carrera. Y la funcion debe
 * de buscar en la base de datos el numero de estudiantes e imprimir en consola
 */

const obtenerCarrera = (nombre, callback) => {
    // let carrera = CARRERAS.find(x => x.nombre == nombre)
    //callback(carrera)
    setTimeout(()=>{
        return  CARRERAS.find(x => x.nombre == nombre)
    },500)
   
}

const imprimirCarrera = (c) => console.log(c);

obtenerCarrera('FINANCIERA', (c) => console.log(c))
obtenerCarrera('FINANCIERA', imprimirCarrera)

//// ACTIVIDAD:
// 1. Buscar una carrera por normbre
// 2. Buscar los estudiantes de la carrera encontrada por id



const buscarEstudiantesPorCarrera = (id_carrera) => {
    // 1. Crear un arreglo temporal
    // 2. Recorrer la base de datos de estudiantes
    // 3. El id_carrera del estudiante del ciclo sea igual al id_carrera que me solicitan
    let estudiantes_carrera = []
    for (let index = 0; index < ESTUDIANTES.length; index++) {
        const estudiante = ESTUDIANTES[index];
        if (estudiante.id_carrera == id_carrera) {
            estudiantes_carrera.push(estudiante)
        }
    }
    return estudiantes_carrera
}

const estudiantesPorCarrera = (nombre_carrera) => {
    //// CALLBACK
    // obtenerCarrera(nombre_carrera, (carrera_obtenida) =>{
    //     console.log('CARRERA OBTENIDA POR NOMBRE', carrera_obtenida);
    //     let estudiantes_carrera = buscarEstudiantesPorCarrera(carrera_obtenida.id)
    //     console.log(estudiantes_carrera);
    // } )

    let carrera = obtenerCarrera(nombre_carrera)
    console.log(carrera);
    
    let estudiantes_carrera= buscarEstudiantesPorCarrera(carrera)
    console.log(estudiantes_carrera);
}

estudiantesPorCarrera('PSICOLOGIA')

