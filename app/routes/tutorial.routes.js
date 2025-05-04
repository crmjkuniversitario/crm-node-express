module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Criar novo tutorial
  router.post("/", tutorials.create);

  // Buscar todos os tutoriais
  router.get("/", tutorials.findAll);

  // Buscar tutorial por id
  router.get("/:id", tutorials.findOne);

  // Atualizar tutorial por id
  router.put("/:id", tutorials.update);

  // Deletar tutorial por id
  router.delete("/:id", tutorials.delete);

  // Deletar todos
  router.delete("/", tutorials.deleteAll);

  app.use("/api/tutorials", router);
};
