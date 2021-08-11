
const imprimir1 = () => {
    console.log('IMPRIMIR 1');
}

const imprimir2 = (callback) => {
    setTimeout(() => {
        console.log('IMPRIMIR 2');
        callback()
    }, 2000)
}

const imprimir3 = (callback) => {
    setTimeout(() => {
        console.log('IMPRIMIR 3');
        callback()
    }, 1000)
}

const imprimir4 = () => {
    console.log('IMPRIMIR 4');
}

const imprimir5 = () => {
    console.log('IMPRIMIR 5');
}

const main = () => {
    imprimir1()
    imprimir2(() => {
        imprimir3(() => {
            imprimir4()
            imprimir5()
        })
    })
}

main()