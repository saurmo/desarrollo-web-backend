const imprimir11 = () => {
  console.log("Imprimir 1");
};

const imprimir22 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Imprimir 2");
      resolve();
    }, 2000);
  });
};

const imprimir33 = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Imprimir 3");
      resolve();
    }, 1000);
  });
};

const imprimir44 = (callback) => {
  console.log("Imprimir 4");
  callback();
};

////Callbacks
// const imprimirTodo = () => {
//   imprimir1();
//   imprimir2(() => {
//     imprimir3(() => {
//       imprimir4(() => {
//         console.log("TERMINO");
//       });
//     });
//   });
// };

//Promesas
const imprimirTodo = async () => {
  imprimir11();
  await imprimir22();
  await imprimir33();
  imprimir44(() => {
    console.log("TERMINO");
  });
};

imprimirTodo();
