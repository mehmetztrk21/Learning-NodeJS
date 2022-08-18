"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
var todos = [];
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("/todo", (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    return res.status(201).json({ message: "Create success.", todo: newTodo });
});
router.put("/todo/:todoId", (req, res, next) => {
    const body = req.body;
    const params = req.params;
    const tId = params.todoId;
    const index = todos.findIndex(item => item.id === tId);
    if (index >= 0) {
        todos[index] = { id: tId, text: body.text };
        return res.status(200).json({ message: "update success.", todos: todos });
    }
    res.status(404).json({ message: "Could not find todo for this id." });
});
router.delete("/todo/:todoId", (req, res, next) => {
    const params = req.params;
    todos = todos.filter((item) => item.id !== params.todoId);
    res.status(200).json({ message: "Deleted todo", todos: todos });
});
exports.default = router;
