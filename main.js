var http = require('http');
var fs = require('fs');
var url = require('url');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ user: [], project: []}).write();
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if (queryData.id === undefined){
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description =  'Hello.WEME';
          var list = '<ul>';
          var i = 0;
          while(i < filelist.length){
            list = list +`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
          }
          list = list +'</ul>';
         var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEME - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEME</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.writeHead(200);
          response.end(template);
        });


      } else {
        fs.readdir('./data', function(error, filelist){
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err,description){
          var title = queryData.id;
          var list = '<ul>';
          var i = 0;
          while(i < filelist.length){
            list = list +`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
          }
          list = list +'</ul>';
          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEME - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEME</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.writeHead(200);
          response.end(template);
        });
      });
    }

  } else {
    response.writeHead(404);
    response.end('Not found');
  }

});
app.listen(3000);
