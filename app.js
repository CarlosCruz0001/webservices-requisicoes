const express = require('express');
const app = express()
const port = 3000

//midleare para parsear Json

app.use(express.json());

//rota geral 

app.all('/',(req, res) =>{
    const method = req.method; 
    res.status(200).send(`o método utilizado foi: ${method}`);
})

//rota para código 2
app.get('/200', (req, res) => {
    res.status(200).send('OK')
})

//rota para cód 404
app.get('/404', (req,res)=>{
    res.status(404).send('não localizado')
})

//rota para cód 405
app.get('/405', (req, res)=>{
    res.status(405).send('Method not allowed')
})

//rota para cód 429
app.get('/429', (req, res)=>{
    res.status(429).send('Too many requests')
})

//rota para cód 500
app.get('/500', (req,res)=>{
    res.status(500).send('Internal server error')
})

//rota pra cód 504
app.get('/504', (req,res)=>{
    res.status(504).send('Gateway timeout')
})

//rotas erros
app.get('/errors/:code', (req,res)=>{
    const code = parseInt(req.params.code, 10)
    res.status(code).send(`Código de erro HTTP : ${code}`)
})

app.listen(port, () =>{
    console.log(`sevidor http codes rodando em http://localhost:${port}`);
})