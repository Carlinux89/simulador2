
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

function guardarCliente() {
  let cedula = recuperaraTexto("cedula");
  let nombre = recuperaraTexto("nombre");
  let apellido = recuperaraTexto("apellido");
  let ingresos = recuperarFloat("ingresos");
  let egresos = recuperarFloat("egresos");

  let cliente = {
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    ingresos: ingresos,
    egresos: egresos
  }
  // 🔑 Si hay cliente seleccionado PERO la cédula cambió
  if (clienteSeleccionado && clienteSeleccionado.cedula !== cedula) {
    clienteSeleccionado = null; // salir del modo edición
  }

  if (clienteSeleccionado) {
    //Actualizar cliente existente
    //clienteSeleccionado.cedula = cedula;
    clienteSeleccionado.nombre = nombre;
    clienteSeleccionado.apellido = apellido;
    clienteSeleccionado.ingresos = ingresos;
    clienteSeleccionado.egresos = egresos;
  } else {
    clientes.push(cliente);
  }
  pintarClientes();
}

function pintarClientes() {
  let tBody = document.getElementById("tablaClientes");
  let contenidoTabla = "";
  let cliRecuperado;
  for (let i = 0; i < clientes.length; i++) {
    cliRecuperado = clientes[i];
    contenidoTabla += "<tr>"
      + "<td> " + cliRecuperado.cedula + "</td >"
      + " <td>" + cliRecuperado.nombre + "</td>"
      + " <td>" + cliRecuperado.apellido + "</td>"
      + " <td>" + cliRecuperado.ingresos + "</td>"
      + " <td>" + cliRecuperado.egresos + "</td>"
      + " <td>"
      + "<button onclick=\"seleccionarCliente('" + cliRecuperado.cedula + "')\">Actualizar</button>"
      + "<button onclick=\"eliminarCliente('" + cliRecuperado.cedula + "')\">Eliminar</button>"
      + "</td>"
      + "</tr > ";
  }
  tBody.innerHTML = contenidoTabla;
}

function buscarCliente(cedula) {
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].cedula === cedula) {
      return clientes[i];
    }
  }
  return null;
}

function seleccionarCliente(cedula) {
  clienteSeleccionado = buscarCliente(cedula);
  if (clienteSeleccionado) {
    mostrarTextoEnCaja("cedula", clienteSeleccionado.cedula);
    mostrarTextoEnCaja("nombre", clienteSeleccionado.nombre);
    mostrarTextoEnCaja("apellido", clienteSeleccionado.apellido);
    mostrarTextoEnCaja("ingresos", clienteSeleccionado.ingresos);
    mostrarTextoEnCaja("egresos", clienteSeleccionado.egresos);
  } else {
    alert("Cliente no encontrado");
  }
}

function limpiarFormulario() {
  mostrarTextoEnCaja("cedula", "");
  mostrarTextoEnCaja("nombre", "");
  mostrarTextoEnCaja("apellido", "");
  mostrarTextoEnCaja("ingresos", "");
  mostrarTextoEnCaja("egresos", "");
  clienteSeleccionado = null;
} 
