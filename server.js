const express = require("express");

const app = express();

//define a porta na qual o servidor vai rodar

const PORT = process.env.PORT || 3000;

//Middleware para permitir o uso de JSON no corpo das requisições

app.use(express.json());

//array para armazenar os itens localmente
let items = [];

//rota para criar um novo item (Create)
app.post("/items", (req, res) => {
  //cria um novo item com um ID único e o nome fornecid no corpo da requisição
  const item = { id: items.length + 1, name: req.body.name };
  //adiciona o novo itemno array de itens
  items.push(item);
  res.status(201).json(item);
});

//rota para obter todos os itens (read all)
app.get("/items", (req, res) => {
  res.json(items);
});

//rota para obter um item específico pelo ID (read one)
app.get("/items/:id", (req, res) => {
  //procura o item pelo ID fornecido nos parâmetros da URL
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
});

//Rota para atualizar um titem específico pelo ID (update)
app.put("/items/:id", (req, res) => {
  //procura o item pelo ID fornecido nos parâmentros da URL
  const item = items.find((i) => i.id === parseInt(req.params.id));
  //se o item não for encontrado, retorna um status 404 (not Found)
  if (!item) return res.status(404).json({ message: "Item not found" });
  //atualiza o nome do item com o valor fornecido no corpo da requisição
  item.name = req.body.name;
  res.json(item);
});

//rota para deletar um item específoc pelo ID (delete)
app.delete("/items/:id", (req, res) => {
  //procra o índice do item pelo ID fornecido nos parâmetros da URL
  const intemIndex = items.findIndex((i) => i.id === parseInt(req.params.id));
  //se o item não for econtrado, retorna um status 404  (not found)
  if (intemIndex === -1)
    return res.status(404).json({ message: "Item not found" });
  // remove item do array de itens
  items.splice(intemIndex, 1);
  //retorna um status 204 (no content) indicando que a operação foi bem-sucedida
  res.status(204).send();
});

//inicia o servidor na porta deifinida
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
