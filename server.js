const express = require("express");
const cors = require("cors");

const app = express();

// CORS aberto para qualquer origem (ideal para testes locais ou Clappia)
app.use(cors());

// Middleware para interpretar JSON e dados URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexão com MongoDB
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Rota padrão
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// Importa as rotas de tutorial
require("./app/routes/tutorial.routes")(app);

// Inicia o servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
