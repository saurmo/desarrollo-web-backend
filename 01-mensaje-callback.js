
const saludar = (nombre) => {
    console.log(`Hola ${nombre}`);
}

const procesarEntrada = (callback) => {
    let nombre = 'Santiago'
    callback(nombre)
}
// Callback con funcion separada
procesarEntrada(saludar)

// Callback declarado en la invocacion
procesarEntrada((nombre) => {
    console.log(`Funcion2: Hola ${nombre}`);
})