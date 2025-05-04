module.exports = mongoose => {
    const Cliente = mongoose.model(
      "cliente",
      new mongoose.Schema(
        {
          nome: String,
          sobrenome: String,
          dataNascimento: Date,
          cpf: String,
          cpfFrente: String,
          cpfVerso: String,
          rg: String,
          rgFrente: String,
          rgVerso: String,
          passaporte: String,
          passaporteArquivo: String,
          nacionalidade: String,
          ocupacao: String,
          celular: String,
          email: String,
          enderecoImovel: String,
          numeroImovel: String,
          complemento: String,
          bairro: String,
          cep: String,
          cidade: String,
          estado: String,
          tempoMoradiaMeses: Number,
          dataEntrada: Date,
          dataSaida: Date,
          diaPagamento: Number,
          valorAluguel: Number
        },
        { timestamps: true }
      )
    );
  
    return Cliente;
  };
  