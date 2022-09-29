

const cargarLibros = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // const libros = ["Las 48 leyes del poder"]
            const libros = []
            if (libros.length > 0) {
                console.log("IMPRIMIR LIBROS NUEVOS");
                resolve(libros) //then
            } else {
                reject("No hay libros") // catch
            }

        }, 3000)
    })

}
// request: Es el callback de la solicitud que se hace despues de abrir la biblio
const abrirBiblioteca = (hora) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (hora > 8) {
                resolve("Abrir biblioteca")
            }else {
                reject("No se puede abrir hasta las 8" )
            }
        }, 5000)
    })

}

// Cuando abra la biblioteca se deben de imprimir los libros nuevos.
// abrirBiblioteca()
// cargarLibros()

// abrirBiblioteca(() => {
//     cargarLibros()
// })

abrirBiblioteca(9).then((response)=>{
    console.log(response);
}).catch((error) => {
    console.log(error);
})

cargarLibros().then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
})