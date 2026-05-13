const http = require('http');
const fs = require('fs');

// Captura o nome do diretório passado como parâmetro no terminal
const dirPath = process.argv[2];

// Verifica se o usuário informou o diretório
if (!dirPath) {
    console.error("Erro: Por favor, informe o diretório como parâmetro.");
    console.log("Uso: node index.js <caminho_do_diretorio>");
    process.exit(1);
}

// Cria o servidor Web
const server = http.createServer((req, res) => {
    // Tenta ler o diretório usando o módulo fs
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            // Se houver erro (ex: pasta não existe), retorna status 500
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`<h1>Erro ao ler o diretório</h1><p>${err.message}</p>`);
            return;
        }

        // Se der sucesso, retorna status 200 e constrói a página HTML
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        
        let htmlResponse = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: monospace; font-size: 24px; padding: 20px; }
            </style>
        </head>
        <body>
        `;

        // Adiciona cada arquivo/diretório em uma nova linha no HTML
        files.forEach(file => {
            htmlResponse += `${file}<br>`;
        });

        htmlResponse += `
        </body>
        </html>
        `;

        // Envia a resposta final
        res.end(htmlResponse);
    });
});

// Define a porta em que o servidor vai escutar
const PORT = 3333;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Lendo arquivos do diretório: ${dirPath}`);
});