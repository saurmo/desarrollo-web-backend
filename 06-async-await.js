
const imprimir1 = () => {
    console.log('IMPRIMIR 1');
}

const imprimir2 = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('IMPRIMIR 2');
            resolve()
            return true
        }, 2000)
    })

}

const imprimir3 = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('IMPRIMIR 3');
            resolve()
            return true
        }, 1000)
    })

}

const imprimir4 = () => {
    console.log('IMPRIMIR 4');
}

const imprimir5 = () => {
    console.log('IMPRIMIR 5');
}

const main = async () => {
    try {
        imprimir1()
        await imprimir2()
        await imprimir3()
        imprimir4()
        imprimir5()
    } catch (error) {

    }

}

const main = async () => {
    imprimir1()
    await imprimir2()
    imprimir3().then(() => {
        imprimir4()
    }).catch(() => {
    })  
    imprimir5()
}

main()