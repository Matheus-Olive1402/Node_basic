var express = require('express');
var router = express.Router();
var model = require('../models/index.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  model.clientes.findAll({})
      .then(clientes => res.json({
          error:false,
          data: clientes
      }))
      .catch(error=>res.json({
          error:true,
          data: [],
          error: error
      }))
});

// POST criar um recurso
router.post('/', function (req, res, next) {
    const {
        nome,
        cpf
    } = req.body;
    model.clientes.create({
            nome: nome,
            cpf: cpf
        })
        .then(clientes => res.status(201).json({
            error: false,
            data: clientes,
            message: 'Novo cliente adicionado com sucesso'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
  });

// PUT alterar um recurso existente
  router.put('/:id', function (req, res, next) {
    const cliente_id = req.params.id;
    const { nome, cpf} = req.body;
    console.log(req.params);
    model.clientes.update({
            nome: nome,
            cpf: cpf
        }, {
            where: {
                id: cliente_id
            }
        })
        .then(clientes => res.status(201).json({
            error: false,
            message: 'Cliente atualizado.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
  });

  //DELETE um recurso existente
  router.delete('/:id', function(req, res, next){
      const cliente_id = req.params.id;
      model.clientes.destroy({where:{
          id:cliente_id
      }}).then(status=>res.status(201).json({
          error:false,
          message: 'Cliente deletado com sucesso.'
      })).catch(error=>res.json({
          error:true,
          error:error
      }));
  });

module.exports = router;
