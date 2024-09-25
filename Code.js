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

  if(imagen){
    let blob = Utilities.newBlob(imagen.datos,imagen.tipo,imagen.nombre);
    let archivo = CARPETA.createFile(blob);
    contacto.imagen = CABECERA_URL_IMAGEN+archivo.getId();
  }

  HOJA.appendRow([contacto.nombre,contacto.apellidos,contacto.correo,contacto.telf,contacto.imagen]);
}

function borrarContacto (numFila){
  HOJA.deleteRow(numFila);
}

function modificarContacto(numFila,datos){
  let celdas = HOJA.getRange('A'+numFila+':D'+numFila);
  celdas.setValues([[datos.nombre,datos.apellidos,datos.correo,datos.telf]]);

}
//importar contactos desde una Api externa https://randomuser.me/documentation
function importarContactos(){
  let url = 'https://randomuser.me/api/?results=5&inc=name,email,phone,picture';
  let respuesta = UrlFetchApp.fetch(url).getContentText();
  let datos = JSON.parse(respuesta);

  datos.results.forEach(insertarContactoJSON );
}

function insertarContactoJSON(contacto){
HOJA.appendRow([contacto.name.first,contacto.name.last,contacto.email,contacto.phone, contacto.picture.large]);

}




