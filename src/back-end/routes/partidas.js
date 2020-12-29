var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

const Partidas = require('../models/partidas');
var authenticate = require('../authenticate');

router.use(bodyParser.json());

/* GET users listing. */
router.route('/')

.get(authenticate.verifyUser, async (req, res, next) => {
  console.log(req.user);
  try{
    const partidas = await Partidas.find({});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(partidas);
  }catch(err){
    err = {};
    res.statusCode = 404;
    res.json(err);
  }
})

.post(authenticate.verifyUser, (req, res, next) => {
  Partidas.create(req.body)
  .then((partida) => {
      console.log('Partida criada ', partida);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(partida);
  }, (err) => next(err))
  .catch((err) => next(err));
})

router.route('/:id')

.get(authenticate.verifyUser, async (req, res, next) => {
  console.log('aqui');
  let err;
  res.setHeader('Content-Type', 'application/json');
  try{
    const resp = await Partidas.findById(req.params.id);
    if(resp != null){
      res.statusCode = 200;
      res.json(resp) //partidas?
    }else{
      err = {};
      res.statusCode = 404;
      res.json(err);
    }
  
  }catch(errParam){
    console.log(errParam);
    res.statusCode = 404;
    res.json({});
  }  
})

.delete(authenticate.verifyUser, (req, res, next) => {
  Partidas.findByIdAndRemove(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp.id);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.put(authenticate.verifyUser, (req, res, next) => {
    Partidas.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, { new: true })
  .then((partida) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(partida);
  }, (err) => next(err))
  .catch((err) => next(err));
})


module.exports = router;
