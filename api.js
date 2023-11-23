const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000; // ou qualquer porta de sua escolha

// Middleware CORS
app.use(cors());

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('lock_dart.db'); // certifique-se de ter o nome correto do seu banco de dados

// Rota para obter todos os usuários
app.get('/usuarios', (req, res) => {
  db.all('SELECT qr_code FROM usuarios', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    const qrCodes = rows.map((row) => row.qr_code);
    res.json({ qrCodes });
  });
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Fechar a conexão com o banco de dados ao encerrar o aplicativo
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Conexão com o banco de dados fechada.');
    process.exit(0);
  });
});
