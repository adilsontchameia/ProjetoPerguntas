//Importar o Sequelize e a Conexao com a DB
const Sequelize = require("sequelize");
const connection = require("./database");

//Definir o Model
//Vai Sincronizar caso a tabela pergunta nao exista
const Pergunta = connection.define('pergunta', {
    titulo:{ //Nome do Campo
        type: Sequelize.STRING, //Tipo(STRING,INT, etc)
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT ,//Tipo TEXT - Textos longos
        allowNull: false
    }
});
//Tudo isso vai virar tabela no nosso BANCO DE DADOS

//Criar Tabela na Database 
Pergunta.sync({ //Caso existir a tabela, nao vai forcar a criacao
    force: false}).then(( ) => {
    console.log("Tabela Criada Com Sucesso.")
    });

//Exportar o modulo pergunta.
module.exports = Pergunta;