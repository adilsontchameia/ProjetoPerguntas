//Importar o Sequelize e a Conexao com a DB
const Sequelize = require("sequelize");
const connection = require("./database");

//Relacionamento entre tabelas, models (perguntas/respostas)
const Resposta = connection.define("respostas", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    //Toda resposta vai responder uma pergunta
    perguntaId: { //Vai guardar o id da pergunta a que se responde
        type: Sequelize.INTEGER,
        allowNull: false 
    }

})

//Criar Tabela na Database 
Resposta.sync({ //Caso existir a tabela, nao vai forcar a criacao
    force: false}).then(( ) => {
    console.log("Tabela Resposta Criada Com Sucesso.")
    });
module.exports = Resposta;