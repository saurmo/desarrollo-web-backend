

const cargarLibros = () => {
    setTimeout(() => {
        console.log("IMPRIMIR DE LIBROS NUEVOS");
    }, 3000)
}
// request: Es el callback de la solicitud que se hace despues de abrir la biblio
const abrirBiblioteca = (callbackRequest) => {
    setTimeout(() => {
        console.log("Biblioteca abierta");
        callbackRequest()
    }, 5000)
}

// Cuando abra la biblioteca se deben de imprimir los libros nuevos.
// abrirBiblioteca()
// cargarLibros()

abrirBiblioteca(() => {
    cargarLibros()
})