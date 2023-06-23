const Evento = require('../models/Evento');

const listarEventos = async (req,res) => {
   Evento.find({},{_id:true, __v:false}).then(result => {
    res.status(200).send(result);
    }).catch(e => res.status(400).send(e));
}

const buscarPorConteudo = async (req,res) =>{
    Evento.find({$text:{$search:req.params.conteudo}},{_id:true,__v:false}).then(result => {
        res.status(200).send(result); 
    }).catch(e => res.status(400).send(e));
}   

const salvarEvento = async (req,res) => {
   Evento.create(req.body).then(result => res.status(200).send
    (result)).catch(e => res.status(400).send(e));
}
   

const deletarEvento = async (req,res) =>{
   Evento.deleteOne({_id:req.params.id}).then(result => {
        if(result.deletedCount > 0) res.status(200).send('Removido com sucesso');
        else res.status(404).send('Evento não encontrado');
    }).catch(e => res.status(400).send(e));
}

const atualizarEvento = async (req,res) =>{
    await Evento.findById(req.params.id).then(result =>{
        if(result){
            result.set(req.body);
            result.save();
            res.status(200).send('Atualizado com sucesso');
        }
    }).catch(e => res.status(404).send('Evento não encontrado'));
}


module.exports = {listarEventos,salvarEvento,buscarPorConteudo,deletarEvento,atualizarEvento};