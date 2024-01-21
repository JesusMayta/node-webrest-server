import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {

    // const persona = {
    //     nombre: 'Jesus',
    //     email: 'rimverse@gmail.com',
    //     id: 1
    // };

    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.write(JSON.stringify(persona));
    // res.end();

    if (req.url === '/') {
        const htmlFile = fs.readFileSync('./src/public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
        return;
    }

    if (req.url?.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
    } else if (req.url?.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
    };

    const responseContent = fs.readFileSync(`./src/public${req.url}`, 'utf-8');
    res.end(responseContent);

});

server.listen(8080, () => {
    console.log('Server listening on port 8080');
});