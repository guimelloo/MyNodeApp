import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post('/api/todos', async (req, res) => {
    const { name, date, location, description } = req.body;

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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
