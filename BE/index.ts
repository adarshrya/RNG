import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Prisma, PrismaClient } from '@prisma/client'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(express.json())
const prisma = new PrismaClient()
app.get('/', (req: Request, res: Response) => {
    res.send('Exp ress + TypeScript Server');
});

app.post(`/todo`, async (req, res) => {
    const { text } = req.body
    const result = await prisma.todo.create({
        data: {
            created_at: new Date(),
            done: false,
            text: text,
        },
    })
    res.json(result)
})

app.put('/todo/:id/edit', async (req, res) => {
    const { id } = req.params
    const { text } = req.body
    try {
        var post = await prisma.todo.update({
            data: {
                text: text,
            },
            where: {
                uid: id
            }
        })
        res.json(post)
    } catch (error) {
        res.json({ error: `Post with ID ${id} does not exist in the database` })
    }
})

app.put('/todo/:id/done', async (req, res) => {
    const { id } = req.params
    try {
        var post = await prisma.todo.update({
            data: {
                done: true,
            },
            where: {
                uid: id
            }
        })
        res.json(post)
    } catch (error) {
        res.json({ error: `Post with ID ${id} does not exist in the database` })
    }
})

app.delete('/todo/:id', async (req, res) => {
    const { id } = req.params
    try {
        var post = await prisma.todo.delete({
            where: {
                uid: id
            }
        })
        res.json(post)
    } catch (error) {
        res.json({ error: `todo with ID ${id} does not exist in the database` })
    }
})

app.get('/todo', async (req, res) => {
    var posts = await prisma.todo.findMany()
    res.json(posts)
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});