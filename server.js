const express = require("express");
const cors = require("cors");

const app = express();

// Configuração de CORS
var corsOptions = {
  origin: "http://localhost:8081" // pode ajustar conforme necessário
};

app.use(cors(corsOptions));

// Middleware para interpretar JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexão com o banco de dados MongoDB
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

// Rota principal
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// Rota de exemplo (corrigido de 'turorial' para 'tutorial')
require("./app/routes/tutorial.routes")(app);

// Inicia o servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
