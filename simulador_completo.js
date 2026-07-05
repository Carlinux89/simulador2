
let clientes = [];
let creditos = [];

let tasaInteres = 15;
let montoMaximo = 0;
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

  let seccionHistorial = document.getElementById("listaCreditos");
  let listaClass4 = seccionHistorial.classList;
  listaClass4.remove("activa");

  let seccionVip = document.getElementById("creditosVIP");
  let listaClass5 = seccionVip.classList;
  listaClass5.remove("activa");

  let seccionAcerca = document.getElementById("acercaDe");
  let listaClass6 = seccionAcerca.classList;
  listaClass6.remove("activa");

  let seccionContacto = document.getElementById("contacto");
  let listaClass7 = seccionContacto.classList;
  listaClass7.remove("activa");

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

  //monto maximo
  montoMaximo = recuperarInt("montoMaximo").toFixed(2);
  if (isNaN(montoMaximo) || montoMaximo < 100 || montoMaximo > 10000) {
    mostrarTexto("mensajeMonto", "Tasa debe estar entre $100 y $10000.");
    return;
  }
  mostrarTexto("mensajeMonto", "Monto configurado correctamente: " + "$" + montoMaximo);
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
  let telefono = recuperaraTexto("telefono");
  let email = recuperaraTexto("email");
  let direccion = recuperaraTexto("direccion");
  let ingresos = recuperarFloat("ingresos");
  let egresos = recuperarFloat("egresos");

  let cliente = {}
  cliente.cedula = cedula;
  cliente.nombre = nombre;
  cliente.apellido = apellido;
  cliente.telefono = telefono;
  cliente.email = email;
  cliente.direccion = direccion;
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
    clienteExistente.telefono = telefono;
    clienteExistente.email = email;
    clienteExistente.direccion = direccion;
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
    mostrarTextoEnCaja("telefono", clienteSeleccionado.telefono);
    mostrarTextoEnCaja("email", clienteSeleccionado.email);
    mostrarTextoEnCaja("direccion", clienteSeleccionado.direccion);
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
      + " <td>" + cliRecuperado.telefono + "</td>"
      + " <td>" + cliRecuperado.email + "</td>"
      + " <td>" + cliRecuperado.direccion + "</td>"
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
  mostrarTextoEnCaja("telefono", "");
  mostrarTextoEnCaja("email", "");
  mostrarTextoEnCaja("direccion", "");
  mostrarTextoEnCaja("ingresos", "");
  mostrarTextoEnCaja("egresos", "");
  //clienteSeleccionado = null;
}

function limpiarFormularioCredito() {
  mostrarTextoEnCaja("buscarCedulaCredito", "");
  document.getElementById("datosClienteCredito").textContent = "";
  mostrarTextoEnCaja("montoCredito", "");
  mostrarTextoEnCaja("plazoCredito", "");
  document.getElementById("resultadoCredito").textContent = "";
  //deshabilitar campos de monto y plazo para calcular crédito
  document.getElementById("montoCredito").disabled = true;
  document.getElementById("plazoCredito").disabled = true;
  document.getElementById("btnCalcular").disabled = true;
  document.getElementById("btnSolicitarCredito").disabled = true;

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
      + "<p><strong>Télefono: </strong>" + resultado.telefono + "</p>"
      + "<p><strong>Email: </strong>" + resultado.email + "</p>"
      + "<p><strong>Direccion: </strong>" + resultado.direccion + "</p>"
      + "<p><strong>Ingresos: </strong>$" + resultado.ingresos.toFixed(2) + "</p>"
      + "<p><strong>Egresos: </strong>$" + resultado.egresos.toFixed(2) + "</p>"
      ;
    //Habilitar campos de monto y plazo para calcular crédito
    document.getElementById("montoCredito").disabled = false;
    document.getElementById("plazoCredito").disabled = false;
    document.getElementById("btnCalcular").disabled = false;
  } else {
    datosClienteCredito.innerHTML = "<p><strong>Cliente no encontrado</strong></p>";
    //deshabilitar campos de monto y plazo para calcular crédito
    document.getElementById("montoCredito").disabled = true;
    document.getElementById("plazoCredito").disabled = true;
    document.getElementById("btnCalcular").disabled = true;
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

  //validar monto sea entre 100 y 10000
  // if (recuperarFloat("montoCredito") < 100 || recuperarFloat("montoCredito") > 10000) {
  //   alert("El monto debe ser entre $1,000 y $10000");
  //   return;
  // }

  let monto = recuperarFloat("montoCredito");
  if (monto > montoMaximo) {
    alert("El monto supera el máximo permitido: $" + montoMaximo);
    mostrarTextoEnCaja("montoCredito", ""); // limpiar input
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

  creditoAprobado = aprobarCredito(capacidadPago, cuotaCalculada);
  if (creditoAprobado === "CREDITO APROBADO") {
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

function asignarCredito() {
  let credito = {
    cedula: clienteSeleccionado.cedula,
    nombre: clienteSeleccionado.nombre,
    apellido: clienteSeleccionado.apellido,
    monto: montoCalculado,
    tasa: tasaInteres,
    plazo: plazoCalculado,
    cuota: cuotaCalculada,
  };

  creditos.push(credito); // se agrega un nuevo objeto al arreglo de créditos
  alert("Crédito registrado exitosamente");
  mostrarSeccion("listaCreditos");
  pintarCreditos(creditos);
  limpiarFormularioCredito();
  if (montoCalculado > 5000) {
    mostrarSeccion("creditosVIP");
    pintarCreditosVIP(creditos)
  }
}

function buscarCreditos(cedula) {
  let creditosCliente = [];
  let creditoRecuperado;
  for (let i = 0; i < creditos.length; i++) {
    creditoRecuperado = creditos[i];
    if (creditoRecuperado.cedula === cedula) {
      creditosCliente.push(creditoRecuperado);
    }
  }
  return creditosCliente;
}

function pintarCreditos(creditos) {
  let tBody = document.getElementById("tablaCreditos");
  let contenidoTabla = "";
  let creditoRecuperado;
  for (let i = 0; i < creditos.length; i++) {
    creditoRecuperado = creditos[i];
    contenidoTabla += "<tr>"
      + "<td>" + creditoRecuperado.cedula + "</td>"
      + "<td>" + creditoRecuperado.nombre + "</td>"
      + "<td>" + creditoRecuperado.apellido + "</td>"
      + "<td>" + creditoRecuperado.monto + "</td>"
      + "<td>" + creditoRecuperado.tasa + "</td>"
      + "<td>" + creditoRecuperado.plazo + "</td>"
      + "<td>" + creditoRecuperado.cuota.toFixed(2) + "</td>"
      + "<td>"
      + "<button onclick=\"eliminarCredito('" + creditoRecuperado.cedula + "')\">Eliminar</button>"
      + "</td>"
      + "</tr>";
  }
  tBody.innerHTML = contenidoTabla;
}

function eliminarCredito(cedula) {
  let indiceEliminar = -1;
  for (let i = 0; i < creditos.length; i++) {
    if (creditos[i].cedula === cedula) {
      indiceEliminar = i;
      break;
    }
  }
  if (indiceEliminar !== -1) {
    creditos.splice(indiceEliminar, 1);
    pintarCreditos();
  }
}

function eliminarCliente(cedula) {
  let indiceEliminar = -1;
  for (let i = 0; i < clientes.length; i++) {
    if (clientes[i].cedula === cedula) {
      indiceEliminar = i;
      break;
    }
  }
  if (indiceEliminar !== -1) {
    clientes.splice(indiceEliminar, 1);
    pintarClientes();
  }
}

function buscarCreditosCliente() {

  let cedula = recuperaraTexto("buscarCedulaListado").trim();

  if (cedula === "") {
    alert("Campo obligatorio");
    return;
  }
  if (!/^\d+$/.test(cedula)) {
    alert("La cédula solo debe contener número");
    return;
  }
  if (cedula.length != 10) {
    alert("La cédula debe contener 10 dígitos");
    return;
  }

  let creditosCliente = buscarCreditos(cedula);
  pintarCreditos(creditosCliente);
}

//examen
function pintarCreditosVip(creditos) {
  let tBody = document.getElementById("tablaCreditos");
  let contenidoTabla = "";
  let creditoRecuperado;
  for (let i = 0; i < creditos.length; i++) {
    creditoRecuperado = creditos[i];
    contenidoTabla += "<tr>"
      + "<td>" + creditoRecuperado.cedula + "</td>"
      + "<td>" + creditoRecuperado.nombre + "</td>"
      + "<td>" + creditoRecuperado.apellido + "</td>"
      + "<td>" + creditoRecuperado.monto + "</td>"
      + "<td>" + creditoRecuperado.tasa + "</td>"
      + "<td>" + creditoRecuperado.plazo + "</td>"
      + "<td>" + creditoRecuperado.cuota.toFixed(2) + "</td>"
      + "<td>"
      + "<button onclick=\"eliminarCredito('" + creditoRecuperado.cedula + "')\">Eliminar</button>"
      + "</td>"
      + "</tr>";
  }
  tBody.innerHTML = contenidoTabla;
}

function pintarCreditosVIP(creditos) {
  let tBody = document.getElementById("tablaCreditosVIP");
  let contenidoTabla = "";
  for (let i = 0; i < creditos.length; i++) {
    let creditoRecuperado = creditos[i];
    if (creditoRecuperado.monto > 5000) {
      contenidoTabla += "<tr>"
        + "<td>" + creditoRecuperado.cedula + "</td>"
        + "<td>" + creditoRecuperado.nombre + "</td>"
        + "<td>" + creditoRecuperado.apellido + "</td>"
        + "<td>" + creditoRecuperado.monto + "</td>"
        + "<td>" + creditoRecuperado.tasa + "</td>"
        + "<td>" + creditoRecuperado.plazo + "</td>"
        + "<td>" + creditoRecuperado.cuota.toFixed(2) + "</td>"
        + "</tr>";
    }
  }

  tBody.innerHTML = contenidoTabla;
}