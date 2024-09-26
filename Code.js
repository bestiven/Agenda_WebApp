const HOJA = SpreadsheetApp.openById('1TpuT4NH63g10pDJel7NdV3xg9AhDbovQzNcZD_yCfFM').getActiveSheet();

const CARPETA = DriveApp.getFolderById('176y4TPNC9s8WqgSQ3faHwdSe6LJhIUyS');
const CABECERA_URL_IMAGEN = 'https://lh3.googleusercontent.com/d/';

function doGet() {
  return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda Contactos');

}

function doPost(datos){
 insertarContacto(datos.parameter.nombre,datos.parameter.correo);
 return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda Contactos');
}

function obtenerDatosHTML(nombre){

 return HtmlService.createHtmlOutputFromFile(nombre).getContent();

}

function obtenerDatos(){
  return HOJA.getDataRange().getValues();
}

function insertarContacto(contacto,imagen){

  if(imagen) contacto.imagen = guardarImagen(imagen);

  HOJA.appendRow([contacto.nombre,contacto.apellidos,contacto.correo,contacto.telf,contacto.imagen]);
}


function modificarContacto(contacto ,imagen){

   if(imagen) contacto.imagen = guardarImagen(imagen);

  let celdas = HOJA.getRange('A'+contacto.fila+':E'+contacto.fila);
  celdas.setValues([[contacto.nombre,contacto.apellidos,contacto.correo,contacto.telf, contacto.imagen]]);

}
//importar contactos desde una Api externa https://randomuser.me/documentation
function importarContactos(){
  let url = 'https://randomuser.me/api/?results=5&inc=name,email,phone,picture';
  let respuesta = UrlFetchApp.fetch(url).getContentText();
  let datos = JSON.parse(respuesta);

  datos.results.forEach(insertarContactoJSON );
}

function guardarImagen(imagen){
  let blob = Utilities.newBlob(imagen.datos,imagen.tipo,imagen.nombre);
  let archivo = CARPETA.createFile(blob);
  return CABECERA_URL_IMAGEN+archivo.getId();
}


function borrarContacto (numFila){
  HOJA.deleteRow(numFila);
}

function insertarContactoJSON(contacto){
HOJA.appendRow([contacto.name.first,contacto.name.last,contacto.email,contacto.phone, contacto.picture.large]);

}




