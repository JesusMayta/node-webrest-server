import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        //* Rutas TODO
        router.use('/api/todos', TodoRoutes.routes);

        return router;
    };

};