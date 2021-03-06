const fs = require('fs');
const path = require('path');
const {matchedWords} = require('./serverLogic.js');

let rootPath = path.join(__dirname, '../');

const handler = (req, res) => {
    const url = req.url;
    const readFiles = (path, contentType) => {
        res.writeHead(200, {'Content-Type': contentType});
        fs.readFile(path, (error, file) => {
            if(error) {
                console.log(error);
            } else {
                res.end(file);
            }
        })
    }
    if (url === '/') {
      readFiles(rootPath + '/public/index.html', 'text/html');
    } else if (url === '/css/style.css') {
      readFiles(rootPath + 'public/css/style.css', 'text/css');
    } else if (url === '/js/logic.js') {
      readFiles(rootPath + 'public/js/logic.js', 'text/javascript');
    } else if (url === '/js/dom.js') {
      readFiles(rootPath + 'public/js/dom.js', 'text/javascript');
    } else if (url === '/search') {
      // res.writeHead(302, {Location: '/'});      
      res.writeHead(200, {'Content-Type': 'application/json'});
      let allData = '';
        req.on('data', (chunk) => {
            allData += chunk;            
        });
        req.on('end', () => {
            const list = matchedWords(allData);
            res.end(JSON.stringify(list));
        })
    }
  }

module.exports = handler;