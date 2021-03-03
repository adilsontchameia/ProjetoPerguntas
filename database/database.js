//Conexao com Sequelize
const Sequelize = require('sequelize');

//Construir a conexao
const connection = new Sequelize('guiapergunta','root','123456',{
    host: 'localhost',
    dialect: 'mysql'
});

//Exportar a conexao para utilizar em outros arquivos, como index.js
module.exports = connection;