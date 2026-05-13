const express = require("express");

const app = express();
const PORT = 3000;

// Permite recebe JSON no corpo da requisição
app.use(express.json());

// Lista em memória para armazenar as mensagens
const mensagens = [];

// Rota webhook para receber mensagens
app.post("/webhook", (req, res) => {
  const { id, mensagem } = req.body;

  if (!id || !mensagem) {
    return res.status(400).json({
      erro: "É necessário enviar id e mensagem."
    });
  }

  const novaMensagem = {
    id,
    mensagem,
    recebidaEm: new Date().toISOString()
  };

  mensagens.push(novaMensagem);

  return res.status(201).json({
    status: "Mensagem recebida com sucesso.",
    dados: novaMensagem
  });
});

// Rota para listar todas as mensagens recebidas
app.get("/mensagens", (req, res) => {
  return res.status(200).json(mensagens);
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
