import express from 'express';

interface Options {
    port: number;
    public_path?: string;
};

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;

    constructor(options: Options) {
        const { port, public_path = 'public' } = options;
        this.port = port;
        this.publicPath = public_path;
    };

    async start() {

        //* Public Folder
        this.app.use(express.static(`src/${this.publicPath}`));

        this.app.listen(8080, () => {
            console.log(`Server running on port ${this.port}`);
        });
    };

};