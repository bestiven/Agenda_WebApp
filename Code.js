const HOJA = SpreadsheetApp.openById('1TpuT4NH63g10pDJel7NdV3xg9AhDbovQzNcZD_yCfFM').getActiveSheet();

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

function obtenerContactos(){
  return HOJA.getDataRange().getValues();
}

function insertarContacto(nombre,apellidos,correo,telf){
  HOJA.appendRow([nombre,apellidos,correo,telf]);
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





