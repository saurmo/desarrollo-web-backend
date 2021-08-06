

/**
 * Operacion de suma para la calculadora
 * @param {Number} numero1 Numero 1 a sumar
 * @param {Number} numero2 Numero 2 a sumar
 */
const sumar = (numero1, numero2) => {
    console.log('Bienvenido a sumar');

    return numero1 + numero2
}

/**
 * Operacion de multiplicar para la calculadora
 * @param {Number} numero1 Numero 1 a sumar
 * @param {Number} numero2 Numero 2 a sumar
 */
const multiplicar = (numero1, numero2) => {
    return numero1 * numero2
}


/**
 * Operacion de resta para la calculadora
 * @param {Number} numero1 Numero 1 a restar
 * @param {Number} numero2 Numero 2 a restar
 */
const restar = (numero1, numero2) => {
    return numero1 - numero2
}

/**
 * Operacion de dividir para la calculadora
 * @param {Number} numero1 Numero 1 a dividir
 * @param {Number} numero2 Numero 2 a dividir
 */
const dividir = (numero1, numero2) => {
    return numero1 / numero2
}

/**
 * Ejecucion de una respuesta=funcion e impresion del log
 * @param {String} nombre Nombre de la respuesta=funcion que se va ejecutar 
 * @param {Function} respuesta=funcion respuesta=Funcion a ejecutar
 */
const ejecutarrespuesta = (nombre, funcionSumar, funcionRestar, funcionMultiplicar, funcionDividir) => {
    console.log('Se inicia la ejecucion de la funcion', nombre);
    let numero1 = 10
    let numero2 = 20
    let respuesta = 0
    switch (nombre) {
        case 'sumar':
            respuesta = funcionSumar(numero1, numero2)
            break;
        case 'restar':
            respuesta = funcionRestar(numero1, numero2)
            break;
        case 'multiplicar':
            respuesta = funcionMultiplicar(numero1, numero2)
            break;
        case 'dividir':
            respuesta = funcionDividir(numero1, numero2)
            break;
        default:
            console.log(`La operacion ${nombre} no esta soportada`);
            break;
    }
    console.log(respuesta);

    console.log('Se finalizo la ejecucion');
}

// ejecutarrespuesta('sumar', sumar, restar, multiplicar, dividir)

ejecutarrespuesta('restar', null, (numero1, numero2) => {
    console.log('Funcion resta modificada');
    return numero1 - numero2
}, null, null)

