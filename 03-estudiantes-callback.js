
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

/**
 * ACTIVIDAD
 * Crear una funcion que capture la identificacion de un estudiante. Y la funcion debe
 * de buscar el estudiante en la base de datos e imprimir el nombre y el apellido.
 * obtenerEstudiante(id)
 * obtenerEstudiante(id, callback) -> El callback es una funcion para imprimir el nombre y apellido 
 */

 const imprimirEstudiante = (estudiante) => {
     console.log(estudiante.nombre, estudiante.apellidos );
 }

 const obtenerEstudianteNormal = (id) => {
     console.log(id);
     // Buscar el estudiante en la base de datos.
    //  // for normal
    //  for (let index = 0; index < ESTUDIANTES.length; index++) {
    //      let estudiante = ESTUDIANTES[index];
    //      if (estudiante.id == id) {
    //          imprimirEstudiante(estudiante)
    //      }
    //  }
    //  // for of
    //  for (const estudiante of ESTUDIANTES) {
    //     if (estudiante.id == id) {
    //         imprimirEstudiante(estudiante)
    //     }
    //  }
     let estudiante = ESTUDIANTES.find( (x) => x.id == id  )
     imprimirEstudiante(estudiante)
 }

 const obtenerEstudiante = (id, callback) => {
    let estudiante = ESTUDIANTES.find( (x) => x.id == id  )
    callback(estudiante)
 }

//obtenerEstudiante(1000018690, imprimirEstudiante)

obtenerEstudiante(1000018690, (estudiante)=>{
    console.log(estudiante.nombre, estudiante.apellidos, estudiante.id);
})