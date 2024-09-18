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
