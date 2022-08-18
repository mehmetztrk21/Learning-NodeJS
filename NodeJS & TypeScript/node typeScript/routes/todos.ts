import { text } from "body-parser";
import express from "express";

import { Todo } from "../models/todo";

const router=express.Router();

var todos:Todo[]=[];

router.get("/",(req,res,next)=>{
    res.status(200).json({todos:todos});
});

router.post("/todo",(req,res,next)=>{
    const newTodo:Todo={
        id:new Date().toISOString(),
        text:req.body.text
    }
    todos.push(newTodo);
    return res.status(201).json({message:"Create success.",todo:newTodo});
})

router.put("/todo/:todoId",(req,res,next)=>{
    const tId=req.params.todoId;
    const index=todos.findIndex(item=>item.id===tId);
    if(index>=0){
        todos[index]={id:tId,text:req.body.text};
        return res.status(200).json({message:"update success.",todos:todos});
    }
    res.status(404).json({message:"Could not find todo for this id."});
});

router.delete("/todo/:todoId",(req,res,next)=>{
    todos=todos.filter((item)=>item.id!==req.params.todoId);
    res.status(200).json({message:"Deleted todo",todos:todos});
});

export default router;