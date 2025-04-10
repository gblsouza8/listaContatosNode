const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// lista com os contatos
let contatos = [
    { id: 1, nome: 'Gabriel', numero: "(11) 88888-8888"},
];

// get
app.get('/contatos', (req, res) => {
    // mensagem exibida ao acessar /contatos
    res.json(contatos);
});

// post
app.post('/contatos', (req, res) => {
    // body requerido para usar o post
    const { nome, numero } = req.body;

    // variavel que irá armazenar as informações do novo contato
    const novoContato = {
        id: contatos.length + 1,
        nome, 
        numero,
    };

    // contato adicionado a lista
    contatos.push(novoContato);
    // mensagem de retorno com o codigo do erro
    res.status(201).json({mensagem: 'Contato adicionado!'});
});

// get id
app.get('/contatos/:id', (req, res) => {
    // captura o id a partir dos parametros usados
    const { id } = req.params;

    // procura o contato que o id é igual ao inserido na url
    const contato = contatos.find(c => c.id === parseInt(id));
    // se o contato nao for encontrado, retorna o erro 404
    if (!contato) {
        return res.status(404).json({mensagem: 'ID não foi encontrado'});
    }

    // exibe o contato
    res.json(contato);
});

// put
app.put('/contatos/:id', (req, res) => {
    // pega o id
    const { id } = req.params;
    // requesitos para atualizar um contato
    const { nome, numero } = req.body;

    // procura na array o id inserido
    const contatoIndex = contatos.findIndex(c => c.id === parseInt(id));
    // se nao achar, erro 404
    if (contatoIndex === -1)
        {
            return res.status(404).json({mensagem: 'Usuário não encontrado'});
        } 
    // altera o contato
    contatos[contatoIndex] = { id: parseInt(id), nome, numero };
    // exibe o erro 200, contato atualizado e exibe o novo contato
    res.status(200).json({
        mensagem: 'Contato atualizado',
        contatoAtualizado: contatos[contatoIndex],
    });
});

// delete
app.delete('/contatos/:id', (req, res) => {
    // pega o id
    const { id } = req.params;

    // procura na array
    const contatoIndex = contatos.findIndex(c => c.id === parseInt(id));

    // se nao achar, erro 404
    if (contatoIndex === -1){
        return res.status(404).json({ mensagem: "Contato não encontrado "});
    }

    // remove o contato da array
    contatos.splice(contatoIndex, 1);
    // erro 200 e mensagem de sucesso
    res.status(200).json({ mensagem: 'Contato deletado'});
});


app.listen(port, () => {
    console.log(`Servidor rodando`);
});