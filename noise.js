/*

┌┐┌┌─┐┬┌─┐┌─┐
││││ ││└─┐├┤
┘└┘└─┘┴└─┘└─┘

A super simple static site generator


*/
var fs = require("fs");
var handlebars = require("handlebars");

var pages = require("./site.json");

assebleThese(pages);

function assebleThese(pages){
  Object.keys(pages).forEach((filename) =>{
    assemble(filename, pages[filename]);
  });
}

function assemble(filename, pageData){
  var html = '';
  pageData.map( (section) => {
    html += smash(section);
  });
  saveFile(filename, html);
}

function saveFile(filename, html) {
  fs.writeFile(filename, html, (err) => {
    if(err) {
      return console.log(err);
    } else {
      console.log(filename, " – Compiled static page successfully!");
    }
  });
}

function smash(section){
  var data = require('./templates/'+ section.data +'.json');
  var file = fs.readFileSync('./templates/'+ section.template +'.hbs', 'utf8');
  var template = handlebars.compile(file);
  return template(data);
}
