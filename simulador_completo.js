
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
  let seccionParametros = document.getElementById("parametros");
  //recupera la lista de clases del componente
  let listaClass = seccionParametros.classList;
  //ocultar la sección
  listaClass.remove("activa");

  let seccionClientes = document.getElementById("clientes");
  let listaClass2 = seccionClientes.classList;
  listaClass2.remove("activa");

  let seccionCreditos = document.getElementById("creditos");
  let listaClass3 = seccionCreditos.classList;
  listaClass3.remove("activa");

}

function mostrarSeccion(id) {
  ocultarSecciones();
  let componente = document.getElementById(id);
  let listaClass = componente.classList;
  listaClass.add("activa");
}

function guardarTasa() {
  let btnClientes = document.getElementById("btnClientes");
  btnClientes.enabled = false;

  tasaInteres = recuperarFloat("tasaInteres");
  if (isNaN(tasaInteres) || tasaInteres < 10 || tasaInteres > 20) {
    mostrarTexto("mensajeTasa", "Tasa debe estar entre 10% y 20%.");
    return;
  }
  mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasaInteres + "%.");
}


function guardarCliente() {

  //validacion cedula, nombre, apellido, ingresos y egresos no pueden estar vacios
  if (recuperaraTexto("cedula").trim() === "" ||
    recuperaraTexto("nombre").trim() === "" ||
    recuperaraTexto("apellido").trim() === "" ||
    recuperaraTexto("ingresos").trim() === "" ||
    recuperaraTexto("egresos").trim() === "") {
    alert("Todos los campos son obligatorios");
    return;
  }

  //validacion cedula debe tener 10 dígitos
  if (recuperaraTexto("cedula").length != 10) {
    alert("La cédula debe contener 10 dígitos");
    return;
  }

  //validacion ingresos y egresos deben ser números positivos
  if (recuperarFloat("ingresos") < 0 || recuperarFloat("egresos") < 0) {
    alert("Ingresos y egresos deben ser números positivos");
    limpiarFormulario();
    return;
  }

  //validacion ingresos deben ser mayores a egresos
  if (recuperarFloat("ingresos") <= recuperarFloat("egresos")) {
    alert("Los ingresos deben ser mayores a los egresos");
    limpiarFormulario();
    return;
  }

  let cedula = recuperaraTexto("cedula");
  let nombre = recuperaraTexto("nombre");
  let apellido = recuperaraTexto("apellido");
  let ingresos = recuperarFloat("ingresos");
  let egresos = recuperarFloat("egresos");

  let cliente = {}
  cliente.cedula = cedula;
  cliente.nombre = nombre;
  cliente.apellido = apellido;
  cliente.ingresos = ingresos;
  cliente.egresos = egresos;

  let clienteExistente = buscarCliente(cedula);
  if (clienteExistente == null) {
    // Agregar nuevo cliente
    clientes.push(cliente);
    limpiarFormulario();
    pintarClientes();
  } else {
    // Actualizar cliente existente
    clienteExistente.nombre = nombre;
    clienteExistente.apellido = apellido;
    clienteExistente.ingresos = ingresos;
    clienteExistente.egresos = egresos;
    limpiarFormulario();
    pintarClientes();
  }
}

function buscarCliente(cedula) {
  let elementoCliente;
  let clienteEncontrado = null;
  for (let i = 0; i < clientes.length; i++) {
    elementoCliente = clientes[i];
    if (elementoCliente.cedula === cedula) {
      clienteEncontrado = elementoCliente;
      break;
    }
  }
  return clienteEncontrado;
}

function seleccionarCliente(cedula) {
  let resultado = buscarCliente(cedula);
  if (resultado != null) {
    clienteSeleccionado = resultado;
    mostrarTextoEnCaja("cedula", clienteSeleccionado.cedula);
    mostrarTextoEnCaja("nombre", clienteSeleccionado.nombre);
    mostrarTextoEnCaja("apellido", clienteSeleccionado.apellido);
    mostrarTextoEnCaja("ingresos", clienteSeleccionado.ingresos);
    mostrarTextoEnCaja("egresos", clienteSeleccionado.egresos);
  } else {
    alert("Cliente no encontrado");
  }
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

function limpiarFormulario() {
  mostrarTextoEnCaja("cedula", "");
  mostrarTextoEnCaja("nombre", "");
  mostrarTextoEnCaja("apellido", "");
  mostrarTextoEnCaja("ingresos", "");
  mostrarTextoEnCaja("egresos", "");
  //clienteSeleccionado = null;
}

function buscarClienteCredito() {
  let cedula = recuperaraTexto("buscarCedulaCredito".trim());
  let resultado = buscarCliente(cedula);
  let datosClienteCredito = document.getElementById("datosClienteCredito");
  if (resultado != null) {
    clienteSeleccionado = resultado;
    datosClienteCredito.innerHTML =
      "<h3>Datos del Cliente</h3>"
      + "<p><strong>Cédula: </strong>" + resultado.cedula + "</p>"
      + "<p><strong>Nombre: </strong>" + resultado.nombre + "</p>"
      + "<p><strong>Apellido: </strong>" + resultado.apellido + "</p>"
      + "<p><strong>Ingresos: </strong>$" + resultado.ingresos.toFixed(2) + "</p>"
      + "<p><strong>Egresos: </strong>$" + resultado.egresos.toFixed(2) + "</p>"
      ;
    //Habilitar campos de monto y plazo para calcular crédito
    document.getElementById("montoCredito").disabled = false;
    document.getElementById("plazoCredito").disabled = false;
    document.getElementById("btnCalcular").disabled = false;
  } else {
    datosClienteCredito.innerHTML = "<p><strong>Cliente no encontrado</strong></p>";
  }
}

function calcularCredito() {
  //validaciones Monto
  //validar monto no puede estar vacio
  if (recuperaraTexto("montoCredito").trim() === "") {
    alert("El monto del crédito es obligatorio");
    return;
  }
  //validar monto sea positivo
  if (recuperarFloat("montoCredito") < 0) {
    alert("El monto del crédito debe ser un número positivo");
    return;
  }

  //validar monto sea entre 100 y 100000
  if (recuperarFloat("montoCredito") < 100 || recuperarFloat("montoCredito") > 100000) {
    alert("El monto debe ser entre $1,000 y $100,000");
    return;
  }
  //validar plazo no puede estar vacio
  if (recuperaraTexto("plazoCredito").trim() === "") {
    alert("El plazo del crédito es obligatorio");
    return;
  }

  //validar plazo debe tener 2 dígitos
  if (recuperaraTexto("plazoCredito").length > 2) {
    alert("El plazo debe tener dos dígitos");
    return;
  }
  //validar palzo deber ser entre 1 y 30 años
  if (recuperarInt("plazoCredito") < 1 || recuperarInt("plazoCredito") > 30) {
    alert("El plazo debe ser entre 1 y 30 años");
    return;
  }

  montoCalculado = recuperarFloat("montoCredito");
  plazoCalculado = recuperarInt("plazoCredito");
  let ingresos = clienteSeleccionado.ingresos;
  let egresos = clienteSeleccionado.egresos;
  let disponible = calcularDisponible(ingresos, egresos);
  let capacidadPago = calcularCapacidadPago(disponible);
  let interes = calcularInteresSimple(montoCalculado, tasaInteres, plazoCalculado);
  let totalAPagar = calcularTotalPagar(montoCalculado, interes);
  cuotaCalculada = calcularCuotaMensual(totalAPagar, plazoCalculado);

  let estadoCredito = aprobarCredito(capacidadPago, cuotaCalculada);
  if (estadoCredito === "CREDITO APROBADO") {
    estadoCredito = "APROBADO";
    document.getElementById("resultadoCredito").className = "aprobado";
    let btnAsignar = document.getElementById("btnSolicitarCredito");
    btnAsignar.disabled = false;
  } else {
    estadoCredito = "RECHAZADO";
    document.getElementById("resultadoCredito").className = "rechazado";
  }
  let resultadoCredito = document.getElementById("resultadoCredito");
  resultadoCredito.innerHTML =
    "Capacidad de pago: $" + capacidadPago.toFixed(2) + "<br>"
    + "Cuota mensual: $" + cuotaCalculada.toFixed(2) + "<br>"
    + "Total a pagar: $" + totalAPagar.toFixed(2) + "<br>"
    + "RESULTADO: " + estadoCredito;

}