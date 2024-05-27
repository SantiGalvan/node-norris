const http = require("http");
const host = 'localhost';
const port = '8080';
const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");

// Lettura file
const readJSONData = (nomeFile) => {
    const filePath = path.join(__dirname, nomeFile + '.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
}

const server = http.createServer((req, res) => {
    const norrisDb = readJSONData('norris-db');
    res.writeHead(200, { "Content-Type": "txt/html; charset=utf-8" });

    // API
    fetch('https://api.chucknorris.io/jokes/random')
        .then(response => response.json())
        .then(data => {
            let last = norrisDb > 0 ? norrisDb[norrisDb.length - 1] : 'Nessuna battuta disponibile';
            let html = `<h3>${last}</h3>`;
        });
    res.end()
});

server.listen((port, host) => {
    console.log(`Server avviato su http://${host}:${port}`);
})