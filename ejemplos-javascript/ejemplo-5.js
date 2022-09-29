

const cargarLibrosAsyncAwait = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const libros = ["Las 48 leyes del poder"]
            // const libros = []
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
const abrirBibliotecaAsyncAwait = (hora) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (hora > 8) {
                resolve("Abrir biblioteca")
            } else {
                reject("No se puede abrir hasta las 8")
            }
        }, 5000)
    })

}


// abrirBiblioteca(9).then((response) => {
//     cargarLibros().then((response) => {
//         console.log(response);
//     }).catch((error) => {
//         console.log(error);
//     })
// }).catch((error) => {
//     console.log(error);
// })

const main = async () => {
    try {
        const responseBibli = await abrirBibliotecaAsyncAwait(7)
        console.log(responseBibli);
        const responseLibros = await cargarLibrosAsyncAwait()
        console.log(responseLibros);
    } catch (error) {
        console.log(error);
    }
}
main()
