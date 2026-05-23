import http from 'http';
import fs from 'fs';
import path from 'path';

import { createLink } from './util.js';

const dirPath = process.argv[2];

if (!dirPath) {
    console.error("Erro: Por favor, informe o diretório como parâmetro.");
    process.exit(1);
}

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readdir(dirPath, (err, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`Erro ao ler o diretório.`);
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            
            let htmlResponse = '';
            files.forEach(file => {
                htmlResponse += createLink(file);
            });
            
            res.end(htmlResponse);
        });
    } 
    else {
        const filename = req.url.substring(1); 
        const filePath = path.join(dirPath, filename);

        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`Arquivo não encontrado. <br><br> <a href="/">Voltar</a>`);
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`<a href="/">Voltar</a><br><h2>${content}</h2>`);
        });
    }
});

const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});