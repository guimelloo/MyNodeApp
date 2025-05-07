import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post('/api/todos', async (req, res) => {
    const { name, date, location, description } = req.body;

    const userSchema = z.object({
        name: z.string().min(1),
        date: z.coerce.date(),
        location: z.string().optional(),
        description: z.string().min(1),
    })

    const success  = userSchema.safeParse(req.body).success;

    if (!success) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    const todo = await prisma.toDo.create({
        data: {
            name, date, location, description
        }
    });
});

app.get('/api/todos', async (req, res) => {
    const todos = await prisma.toDo.findMany();
    res.json(todos);
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


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
