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


module.exports = router;
