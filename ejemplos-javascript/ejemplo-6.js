
let estudiantes = []

estudiantes.push({ id: 1 })
estudiantes.push({ id: 2 })
estudiantes.push({ id: 3 })

console.log(estudiantes);
// Eliminar el ultimo elemento
estudiantes.pop()
console.log(estudiantes);

// Actualizar
// splice(posicion, numero de elementos a elimar, datos a actualizar )
estudiantes.splice(1, 1, { id: 2, name: "carlos" })
console.log(estudiantes);

// Eliminar un elemento en una posicion
estudiantes.splice(0, 1)
console.log(estudiantes);

estudiantes.push({ id: 4 })

// Recorrer un array
estudiantes.forEach((estudiante) => {
    console.log("est:", estudiante.id);
})
// Buscar la posicion de una elemento
const posicion = estudiantes.findIndex((estudiante) => {
    const existe = estudiante.id == 4
    return existe
})
const posicion2 = estudiantes.findIndex((e) => e.id == 4)

console.log("posicion del est 4:", posicion);
console.log("posicion del est 4:", posicion2);


