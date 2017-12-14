var fs = require("fs");
var handlebars = require("handlebars");

var site = require("./site.json");
generateOutputFile(site);

function generateOutputFile(site){
  fs.writeFile("./dest/index.html", renderFromExternalTemplate("./template.html", site), function(err) {
    if(err) { return console.log(err); }
  });
}

function renderFromExternalTemplate(templateFile, data){
  var file = fs.readFileSync(templateFile, "utf8");
  var template = handlebars.compile(file);
  return template(data);
}
