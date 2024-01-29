import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

export class TodosController {

    //* DI
    constructor() { }

    public getTodos = async (req: Request, res: Response) => {
        const [total, todos] = await Promise.all([
            prisma.todo.count(),
            prisma.todo.findMany()
        ])
        return res.json({ total, todos });
    };

    public getTodoById = async (req: Request, res: Response) => {

        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const todoById = await prisma.todo.findFirst({ where: { id } });

        // const todo = todos.find((todo) => todo.id === id);

        (todoById)
            ? res.json(todoById)
            : res.status(404).json({ msg: `Todo  with id ${id} not exist!` });
    };

    public createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        // const { name } = req.body;
        if (error) return res.status(400).json({ error });

        const newTodo = await prisma.todo.create({
            data: createTodoDto!
        });
        res.json(newTodo);
    };

    public updateTodo = async (req: Request, res: Response) => {

        const id = +req.params.id;

        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

        console.log(error);

        if (error) return res.status(400).json({ error });

        const todo = await prisma.todo.findFirst({ where: { id } });

        if (!todo) return res.status(400).json({ error: `Todo with id ${id} not found` });

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: updateTodoDto!.values
        });

        res.json(updatedTodo);
    };

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = await prisma.todo.findFirst({ where: { id } });
        if (!todo) return res.status(400).json({ error: `Todo with id ${id} not found` });

        const deletedTodo = await prisma.todo.delete({
            where: { id }
        });

        // const todo = todos.find((todo) => todo.id === id);
        // todos.splice(todos.indexOf(todo), 1);

        (deletedTodo)
            ? res.json(deletedTodo)
            : res.status(400).json({
                error: `Todo with id ${id} not found`
            });
    };

};