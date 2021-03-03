//Estrutura basica de uma aplicacao express
const express = require("express");
const app = express(); //Modulo Express
const bodyParser = require("body-parser"); //traduzir dados enviados por form, por uma estrutura js
const connection = require("./database/database"); //Conexao Exportada do arquivo database
const Pergunta = require("./database/Pergunta"); //Importar o model para a app
const Resposta = require("./database/Resposta");
//Bibliotecas e Documentos Exportados

//Database
connection
.authenticate()
.then(() => { //chamado quando correr com sucesso
console.log("Conexao do Banco de Dados, feita com sucesso!")
})
.catch((msgErro) => {
    console.log(msgErro)
})
//Fim da Conexao Com o MYSQL


//Dizer ao express usar o ejs como renderizador
app.set(`view engine`,`ejs`);
app.use(express.static('public'));

//traduzir dados enviados por form, por uma estrutura js
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());



/* TODAS ROTAS DA APLICACAO*/

//Rota index
app.get("/",(req,res) => {
    //Model Pergunta, representa a tabela perguntas.
    //Vai procurar todas perguntas
    //SELECT * ALL FROM perguntas = findAll()
    Pergunta.findAll({raw: true, order:[
        ['id','DESC'] 
        //ASC = Crescente / DESC = Decrescente //Ordenar
        //exe: ['titulo','ASC'] 
    ]}).then(perguntas => { //Vai receber as perguntas
        res.render("index", { 
        perguntas: perguntas //Variavel perguntas foi ao front-end
        });
    });
});

//Rota perguntar
app.get("/perguntar",(req,res) => {
    res.render("perguntar");
})

//Rota para receber os dados do formulario
//nossa rota tem que ser post, como o formulario
//POST - receber dados de formularioos
app.post("/salvarpergunta",(req,res) => { 
    //Recebendo os dados do formulario
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    //Para Salvar Um Dado numa Tabela, apos 
    //importar tenho que chamar o metodo creat, que e igual a INSERT INTO 
    Pergunta.create({ //Salvando com os dados do formulario
    titulo: titulo,
    descricao: descricao

    }).then(() => {
    res.redirect("/") //
    }); //O que sera feito apos salvar a pergunta com sucesso
});

//Rota para procurar perguntas pelo id
app.get("/pergunta/:id",(req,res) => {
    var id = req.params.id;
    Pergunta.findOne({//Buscar perguntas no DB pelo id.
    where: {id: id} //Buscar uma pergunta com id, igual ao valor que ser colocado na rota.
    }).then(pergunta =>{
    if(pergunta != undefined) { //Pergunta encontrada
    
        Resposta.findAll({
            where: {perguntaId: pergunta.id},
            order:[
                ['id','DESC']
            ]
        }).then(respostas => {
            res.render("pergunta", {
                pergunta: pergunta, //Variavel achada no db  
                respostas: respostas            });
        });
    }else{ //Pergunta nao encontrada
    res.redirect("/");
    }
    }) //Quando a operacao de busca for concluida, vai chamar o then
});

//Receber os dados do formulario
app.post("/responder",(req,res) => {

    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
    res.redirect("/pergunta/"+perguntaId)
    })
});

//Porta do App
app.listen(8081,()=> 
{console.log("Aplicativo Node.JS Rodando");});