var fs = require("fs");
var handlebars = require("handlebars");



var pages = {
  "index.html": [
    {
      'template': 'header',
      'data': 'data',
    },
    {
      'template': 'services',
      'data': 'data',
    },
    {
      'template': 'portfolio',
      'data': 'portfolio',
    },
    {
      'template': 'team',
      'data': 'team',
    },
    {
      'template': 'contact',
      'data': 'data',
    },
    {
      'template': 'footer',
      'data': 'data',
    }
  ],
  "case-study/deepardemo.html": [
    {
      'template': 'header',
      'data': 'data',
    },
    {
      'template': 'case-study',
      'data': 'deepardemo',
    },
    {
      'template': 'footer',
      'data': 'data',
    }
  ]
}



generateOutputFiles(pages);



function generateOutputFiles(pages){
  Object.keys(pages).forEach((page) =>{
    generateOutputFile(page, pages[page]);
  });

}

function generateOutputFile(outputFile, site){
  var html = '';

  site.map( (section) => {
    html += renderFromExternalTemplate(section);
  });


  fs.writeFile(outputFile, html, function(err) {
    if(err) {
      return console.log(err);
    } else {
      console.log("Compiled static pages successfully!");
    }
  });
}

function renderFromExternalTemplate(section){
  var data = require('./templates/'+ section.data +'.json');
  var file = fs.readFileSync('./templates/'+ section.template +'.hbs', 'utf8');
  var template = handlebars.compile(file);
  return template(data);
}
