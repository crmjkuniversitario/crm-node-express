const mongoose = require("mongoose");
const fs = require("fs");

// String de conexão completa com o nome do banco (substitua 'crm_pousada' se quiser outro nome):
const MONGO_URI = "mongodb+srv://crmjkuniversitario:jM1iN9rh7IVY9Uia@cluster0.ilgp83f.mongodb.net/crm_pousada?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Conectado ao MongoDB!");
  importarClientes();
}).catch(err => {
  console.error("❌ Erro ao conectar:", err);
  process.exit();
});

// Modelo compatível com sua collection "tutorials"
const Cliente = mongoose.model("Tutorial", new mongoose.Schema({
  title: String,
  description: String,
  published: Boolean
}, { timestamps: true }));

function importarClientes() {
  const dados = JSON.parse(fs.readFileSync("clientes.json", "utf8"));

  Cliente.insertMany(dados)
    .then(() => {
      console.log("✅ Clientes importados com sucesso!");
      mongoose.disconnect();
    })
    .catch(err => {
      console.error("❌ Erro ao importar clientes:", err);
      mongoose.disconnect();
    });
}
