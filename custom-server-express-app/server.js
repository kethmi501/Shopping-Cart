import express from 'express';
import next from 'next';
import {createProxyMiddleware} from 'http-proxy-middleware';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8000',
            changeOrigin: true,
        }),
    );

    server.all('*', (req, res) => handle(req, res));

    server.listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
