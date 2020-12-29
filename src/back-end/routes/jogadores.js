var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Jogadores = require('../models/jogadores');
var authenticate = require('../authenticate');

router.use(bodyParser.json());


/* GET users listing. */
router.route('/')

.get(authenticate.verifyUser, async (req, res, next) => {
  console.log(req.user);
  try{
    const jogadores = await Jogadores.find({});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(jogadores);
  }catch(err){
    err = {};
    res.statusCode = 404;
    res.json(err);
  }
})

.post(authenticate.verifyUser, (req, res, next) => {
  Jogadores.create(req.body)
  .then((jogador) => {
      console.log('Jogador criado ', jogador);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(jogador);
  }, (err) => next(err))
  .catch((err) => next(err));
})

router.route('/:id')

.get(authenticate.verifyUser, async (req, res, next) => {
  let err;
  res.setHeader('Content-Type', 'application/json');
  try{
    const resp = await Jogadores.findById(req.params.id);
    if(resp != null){
      res.statusCode = 200;
      res.json(resp);
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
  Jogadores.findByIdAndRemove(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp.id);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.put(authenticate.verifyUser, (req, res, next) => {
    Jogadores.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, { new: true })
  .then((jogador) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(jogador);
  }, (err) => next(err))
  .catch((err) => next(err));
})


module.exports = router;
