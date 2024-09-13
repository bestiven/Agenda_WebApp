function doGet() {
  return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda Contactos');

}

function obtenerDatosHTML(nombre){

 return HtmlService.createHtmlOutputFromFile(nombre).getContent();

}

function obtenerContactos(){
  let hoja = SpreadsheetApp.openById('aaa1TpuT4NH63g10pDJel7NdV3xg9AhDbovQzNcZD_yCfFM').getActiveSheet();
  let datos = hoja.getDataRange().getValues();
  return datos;
}