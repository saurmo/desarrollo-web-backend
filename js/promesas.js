let usuarios = [
  { nombre: "ARROYAVE HERNÁNDEZ JUAN PABLO", id: 1 },
  { nombre: "ATEHORTÚA ZAPATA JADER DANIEL", id: 2 },
  { nombre: "AVILES RUIZ JHON MARIO", id: 3 },
  { nombre: "CANO DUQUE SANTIAGOx", id: 4 },
  { nombre: "ESCUDERO BOWIE EDWARD ANTHONY", id: 5 },
  { nombre: "FORERO HINCAPIÉ SANTIAGO", id: 6 },
  { nombre: "FOX SIERRA SEBASTIÁN", id: 7 },
  { nombre: "FRANCO ALZATE MARÍA ALEJANDRA", id: 8 },
  { nombre: "GÓMEZ LOBO KAREN ANDREA", id: 9 },
  { nombre: "GUZMÁN AGUDELO SEBASTIÁN", id: 10 },
  { nombre: "IGLESIAS MONTOYA MARÍA CAMILA", id: 11 },
];
const obtenerUsuarioP = (id) => {
  return new Promise((resolve, reject) => {
    //Buscar el usuario
    let usuario = usuarios.find((x) => x.id == id);
    if (usuario) {
      // Si lo encuentra invoca el callback con el usuario
      setTimeout(() => {
        resolve(usuario);
      }, 5000);
    } else {
      // sino  invoca el callback con null
      reject(null);
    }
  });
};
// console.log(obtenerUsuarioP(5));
obtenerUsuarioP(15)
  .then((usuario) => {
    console.log("Resolve");
    console.log(usuario);
  })
  .catch((error) => {
    console.log("reject promise:", error);
  });
