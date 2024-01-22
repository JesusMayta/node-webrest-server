import { Request, Response } from "express";

const todos = [
    { id: 1, name: 'Buy milk', createdAt: new Date() },
    { id: 2, name: 'Send emails', createdAt: new Date() },
    { id: 3, name: 'Send clowns', createdAt: null },
];

export class TodosController {

    //* DI
    constructor() { }

    public getTodos = (req: Request, res: Response) => {
        return res.json(todos);
    };

    public getTodoById = (req: Request, res: Response) => {

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = todos.find((todo) => todo.id === id);

        (todo)
            ? res.json(todo)
            : res.status(404).json({ msg: `Todo  with id ${id} not exist!` });
    };

    public createTodo = (req: Request, res: Response) => {

        const { name } = req.body;
        if (!name) return res.status(400).json({ error: 'Name property is required!' });
        const newTodo = { id: todos.length + 1, name, createdAt: null }
        todos.push(newTodo);
        res.json(newTodo);
    };

    public updateTodo = (req: Request, res: Response) => {

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = todos.find((todo) => todo.id === id);
        if (!todo) return res.status(400).json({ error: `Todo with id ${id} not found` });

        const { name, createdAt } = req.body;
        if (!name) return res.status(400).json({ error: 'Name property is required' });

        todo.name = name || todo.name;

        (createdAt === 'null')
            ? todo.createdAt = null
            : todo.createdAt = new Date(createdAt || todo.createdAt);

        res.json(todo);
    };

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = todos.find((todo) => todo.id === id);
        if (!todo) return res.status(400).json({ error: `Todo with id ${id} not found` });

        todos.splice(todos.indexOf(todo), 1);

        res.json(todo);
    };

};