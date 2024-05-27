const http = require("http");
const host = 'localhost';
const port = 8000;
const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");

// Lettura file
const readJSONData = (nomeFile) => {
    const filePath = path.join(__dirname, nomeFile + '.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileData);
}

// Scrittura file
const writeJSONData = (nomeFile, newData) => {
    const filePath = path.join(__dirname, nomeFile + '.json');
    const fileString = JSON.stringify(newData);
    fs.writeFileSync(filePath, fileString);
}

const isDuplicate = (jokesDb, value) => {
    let found = false;
    jokesDb.forEach(j => {
        if (j.value === value) {
            found = true;
        }
    });
    return found;
}

const server = http.createServer((req, res) => {

    const norrisDb = readJSONData('norris-db');

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

    // API
    fetch('https://api.chucknorris.io/jokes/random')
        .then(response => response.json())
        .then(data => {
            if (!isDuplicate(norrisDb, data.value)) {
                norrisDb.push({ value: data.value });
                writeJSONData('norris-db', norrisDb);
            }

            let last = norrisDb.length > 0 ? norrisDb[norrisDb.length - 1].value : 'Nessuna battuta disponibile';
            let norrisHtml = `<h3>${last}</h3>`;
            res.end(norrisHtml);
        });
});

server.listen(port, host, () => {
    console.log(`Server avviato su http://${host}:${port}`);
})