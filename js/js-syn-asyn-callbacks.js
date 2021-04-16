const imprimir1 = () => {
  console.log("Imprimir 1");
};

const imprimir2 = (callback) => {
  setTimeout(() => {
    console.log("Imprimir 2");
    callback();
  }, 2000);
};

const imprimir3 = (callback) => {
  setTimeout(() => {
    console.log("Imprimir 3");
    callback();
  }, 1000);
};

const imprimir4 = (callback) => {
  console.log("Imprimir 4");
  callback();
};

const imprimirTodo = () => {
  imprimir1();
  imprimir2(() => {
    imprimir3(() => {
      imprimir4(() => {
        console.log("TERMINO");
      });
    });
  });
};

imprimirTodo();
