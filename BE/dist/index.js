"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const path = require('path');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
const prisma = new client_1.PrismaClient();
app.get('/Test', (req, res) => {
    res.send('Exp ress + TypeScript Server');
});
app.post(`/api/todo`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    const result = yield prisma.todo.create({
        data: {
            created_at: new Date(),
            done: false,
            text: text,
        },
    });
    res.json(result);
}));
app.put('/api/todo/:id/edit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { text } = req.body;
    try {
        var post = yield prisma.todo.update({
            data: {
                text: text,
            },
            where: {
                uid: id
            }
        });
        res.json(post);
    }
    catch (error) {
        res.json({ error: `Post with ID ${id} does not exist in the database` });
    }
}));
app.put('/api/todo/:id/done', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        var post = yield prisma.todo.update({
            data: {
                done: true,
            },
            where: {
                uid: id
            }
        });
        res.json(post);
    }
    catch (error) {
        res.json({ error: `Post with ID ${id} does not exist in the database` });
    }
}));
app.delete('/api/todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        var post = yield prisma.todo.delete({
            where: {
                uid: id
            }
        });
        res.json(post);
    }
    catch (error) {
        res.json({ error: `todo with ID ${id} does not exist in the database` });
    }
}));
app.get('/api/todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var posts = yield prisma.todo.findMany({
        orderBy: [
            {
                created_at: 'desc',
            }
        ]
    });
    res.json(posts);
}));
app.use(express_1.default.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
