import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {

    static get routes(): Router {

        const router = Router();
        const todosController = new TodosController();

        //* Get Todos
        router.get('/', todosController.getTodos);

        //* Get TODO by ID
        router.get('/:id', todosController.getTodoById);

        //*Post TODO
        router.post('/create', todosController.createTodo);

        //*Update TODO
        router.put('/update/:id', todosController.updateTodo);

        //*Delete TODO
        router.delete('/delete/:id', todosController.deleteTodo);

        return router;
    };

};