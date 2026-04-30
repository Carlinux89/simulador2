
let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;


//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

function ocultarSecciones() {
  //recuperar los elementos de las secciones y ocultarlos
  let componente = document.getElementById("parametros");
  //recupera la lista de clases del componente
  let listaClass = componente.classList;
  //ocultar la sección
  listaClass.remove("activa");

  let componente2 = document.getElementById("clientes");
  let listaClass2 = componente2.classList;
  listaClass2.remove("activa");
}

function mostrarSeccion(id) {
  ocultarSecciones();
  let componente = document.getElementById(id);
  let listaClass = componente.classList;
  listaClass.add("activa");
}

function guardarTasa() {
  tasaInteres = recuperarFloat("tasaInteres");
  if (isNaN(tasaInteres) || tasaInteres < 10 || tasaInteres > 20) {
    mostrarTexto("mensajeTasa", "Tasa debe estar entre 10% y 20%.");
    return;
  }
  mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasaInteres + "%.");
}