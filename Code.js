function doGet() {
  return HtmlService.createTemplateFromFile('web').evaluate().setTitle('Agenda Contactos');

}

function obtenerDatosHTML(nombre){

 return HtmlService.createHtmlOutputFromFile(nombre).getContent();

}