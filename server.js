const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let contatos = [
    { id: 1, nome: 'Gabriel', numero: "(11) 88888-8888"},
];

// get
app.get('/contatos', (req, res) => {
    res.json(contatos);
});

// post
app.post('/contatos', (req, res) => {
    const { nome, numero } = req.body;

    const novoContato = {
        id: contatos.length + 1,
        nome, 
        numero,
    };

    contatos.push(novoContato);
    res.status(201).json({mensagem: 'Contato adicionado!'});
});

// get id
app.get('/contatos/:id', (req, res) => {
    const { id } = req.params;
    const contato = contatos.find(c => c.id === parseInt(id));
    if (!contato) {
        return res.status(404).json({mensagem: 'ID não foi encontrado'});
    }

    res.json(contato);
});

// put
app.put('/contatos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, numero } = req.body;

    const contatoIndex = contatos.findIndex(c => c.id === parseInt(id));
    if (contatoIndex === -1)
        {
            return res.status(404).json({mensagem: 'Usuário não encontrado'});
        } 
    contatos[contatoIndex] = { id: parseInt(id), nome, numero };
    res.status(200).json({
        mensagem: 'Contato atualizado',
        contatoAtualizado: contatos[contatoIndex],
    });
});

// delete
app.delete('/contatos/:id', (req, res) => {
    const { id } = req.params;

    const contatoIndex = contatos.findIndex(c => c.id === parseInt(id));

    if (contatoIndex === -1){
        return res.status(404).json({ mensagem: "Contato não encontrado "});
    }

    contatos.splice(contatoIndex, 1);
    res.status(200).json({ mensagem: 'Contato deletado'});
});


app.listen(port, () => {
    console.log(`Servidor rodando`);
});