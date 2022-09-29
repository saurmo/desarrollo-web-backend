
const imprimirEstudiante = (estudiante) => {
    console.log("Estudiante", estudiante);
}

const imprimirProfesor = (profesor, callback) => {
    setTimeout(() => {
        console.log("Profesor:", profesor);
        callback()
    }, 800)
}

const imprimirUniversidad = (universidad, callbackEstudiante, callbackProfesor) => {
    setTimeout(() => {
        console.log("universidad", universidad.name);
        callbackProfesor(universidad.profe, () => {
            callbackEstudiante(universidad.estudiantes)
        })

    }, 1000)
}

imprimirUniversidad(
    { name: "UdeM", estudiantes: ["Camilo", "Susana"], profe: "Emilio" },
    imprimirEstudiante,
    imprimirProfesor
)
// imprimirEstudiante("Juan Estudiante")
// imprimirProfesor("Carlos Profesor")