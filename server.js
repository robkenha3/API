//Node.js -> escrever javascript para o backend

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];
let currentID = 1;  //incrementar ID

//Obs: sempre assim!
app.post("/tasks", (request, response)=>{
    let bodyRequest = request.body
    let newTask = {
        id: currentID++, //gera um novo id incrementado
        titulo: bodyRequest.titulo,
        descricao: bodyRequest.descricao,
        status: bodyRequest.status
    }

    tasks.push(newTask);
    response.status(200).json({message: "tarefa criada com sucesso", newTask});
})

app.get("/oi", (request, response)=>{
    return response.status(200).json("Salve, mundao!")
})

app.get("/tasks", (request, response)=>{
    return response.status(200).json(tasks)
})

app.get("/tasks/:id", (request, response)=>{
    let idRequest = request.params.id

    const taskEncontrada = tasks.find((tarefa) => tarefa.id == idRequest)

    if(!taskEncontrada) {
        return response.status(404).json({message: "Tarefa nao encontrada"})

    }

    return response.status(200).json(taskEncontrada)
})

app.delete("/tasks/:id", (request, response)=>{
    let idRequest = request.params.id

    const taskEncontrada = tasks.find((tarefa) => tarefa.id == idRequest)

    if(!taskEncontrada) {
        return response.status(404).json({message: "Tarefa nao encontrada"})
    }
    const taskEncontradaIndex = tasks.findIndex((tarefa) => tarefa.id == idRequest);

    tasks.splice(taskEncontradaIndex, 1);
    return response.status(200).json({message: "tarefa deletada", taskEncontrada})
})

app.put("/tasks/:id", (request, response)=>{
    let idRequest = request.params.id
    let bodyRequest = request.body

    const taskEncontradaIndice = tasks.findIndex((tarefa) => tarefa.id == idRequest)

    if(taskEncontradaIndice === -1) {
        return response.status(404).json({message: "Tarefa nao encontrada"})
    }

    let tarefaAtualizada = tasks[taskEncontradaIndice];
    tarefaAtualizada = {
        id: idRequest++, //mantem id
        titulo: bodyRequest.titulo,
        descricao: bodyRequest.descricao,
        status: bodyRequest.status
    }

    return response.status(200).json({message: "tarefa atualizada", tarefaAtualizada})
})


app.listen(PORT, ()=>{
    console.log(" Servidor ta rolando na porta 3000, UHUL")
}) //arrow function -> função anônima