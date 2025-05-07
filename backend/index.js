import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { z, ZodError } from 'zod';

const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post('/api/todos', async (req, res, next) => {
    try {
        const schema = z.object({
            name: z.string().min(1),
            date: z.coerce.date(),
            location: z.string().optional(),
            description: z.string().min(1),
        });

        const data = schema.parse(req.body);
        
        const todo = await prisma.toDo.create({ data });

        res.status(201).header('Location', `/api/todos/${todo.id}`);
    } catch (error) {
        next(error);
    }
});

app.get('/api/todos', async (req, res, next) => {
    try {
        const schema = z.object({
            per_page: z.coerce.number().min(1).max(100).default(10),
            page: z.coerce.number().min(1).default(1),
        });

        const { per_page, page } = schema.parse(req.query);

        const todos = await prisma.toDo.findMany({
            skip: (page - 1) * per_page,
            take: per_page,
        });
        
        res.json(todos);
    } catch (error) {
        next(error);
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.toDo.delete({
        where: { id: parseInt(id) }
    });
    res.json({ message: 'Todo deleted' });
});

app.patch('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { name, date, location, description } = req.body;
    await prisma.toDo.update({
        where: { id: parseInt(id) },
        data: { name, date, location, description }
    });
    res.json({ message: 'Todo updated' });
});

app.use((err, req, res, next) => {
    if (err instanceof ZodError) {
        return res.status(422).json({ error: err.message });
    }

    if (!isProduction) {
        return res.status(500).json({ error: err.stack });
    }

    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
