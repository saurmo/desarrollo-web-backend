const imprimir1 = () => {
  console.log("Imprimir 1");
};

const imprimir2 = () => {
  setTimeout(() => {
    console.log("Imprimir 2");
  }, 2000);
};

const imprimir3 = () => {
  setTimeout(() => {
    console.log("Imprimir 3");
  }, 1000);
};

const imprimir4 = () => {
  console.log("Imprimir 4");
};

const imprimirTodo = () => {
  imprimir1();
  imprimir2();
  imprimir3();
  imprimir4();
};

imprimirTodo();
