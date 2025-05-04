const mongoose = require("mongoose");
const dbConfig = require("../config/db.config.js");

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

// Carrega os modelos
db.tutorials = require("./tutorial.model.js")(mongoose);
db.clientes = require("./cliente.model.js")(mongoose); // Adicionado corretamente aqui

module.exports = db;
