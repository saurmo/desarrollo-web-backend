

/**
 * Operacion de suma para la calculadora
 * @param {Number} numero1 Numero 1 a sumar
 * @param {Number} numero2 Numero 2 a sumar
 */
const sumar= (numero1, numero2)=>{
 return numero1+numero2 
}

/**
 * Operacion de multiplicar para la calculadora
 * @param {Number} numero1 Numero 1 a sumar
 * @param {Number} numero2 Numero 2 a sumar
 */
const multiplicar= (numero1, numero2)=>{
    return numero1*numero2 
   }

/**
 * Ejecucion de una funcion e impresion del log
 * @param {String} nombre Nombre de la funcion que se va ejecutar 
 * @param {Function} funcion Funcion a ejecutar
 */
const ejecutarFuncion = (nombre, funcion) => {
    console.log('Se inicia la ejecucion de la funcion', nombre);
    funcion()
    console.log('Se finalizo la ejecucion');
}

ejecutarFuncion('suma', (numero1, numero2)=>{
console.log('Estamos dentro del callback');
})