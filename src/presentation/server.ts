import express, { Router } from 'express';
import 'colors';

interface Options {
    port: number;
    routes: Router;
    public_path?: string;
};

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    };

    async start() {

        //* Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        //* Public Folder
        this.app.use(express.static(`src/${this.publicPath}`));

        //* Routes 
        this.app.use(this.routes);

        this.app.listen(8080, () => {
            console.log('Server running on port:'.blue, `${this.port}`.yellow.bold);
        });
    };

};