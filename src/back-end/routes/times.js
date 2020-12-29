var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const Times = require('../models/times');
var authenticate = require('../authenticate');

router.use(bodyParser.json());


/* GET users listing. */
router.route('/')

.get(authenticate.verifyUser, async (req, res, next) => {
  console.log(req.user);
  try{
    const times = await Times.find({});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(times);
  }catch(err){
    err = {};
    res.statusCode = 404;
    res.json(err);
  }
})

.post(authenticate.verifyUser, (req, res, next) => {
  Times.create(req.body)
  .then((time) => {
      console.log('Time criado ', time);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(time);
  }, (err) => next(err))
  .catch((err) => next(err));
})

router.route('/:id')

.get(authenticate.verifyUser, async (req, res, next) => {
  let err;
  res.setHeader('Content-Type', 'application/json');
  try{
    const resp = await Times.findById(req.params.id);
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
  Times.findByIdAndRemove(req.params.id)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp.id);
    }, (err) => next(err))
    .catch((err) => next(err));
})

.put(authenticate.verifyUser, (req, res, next) => {
    Times.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, { new: true })
  .then((time) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(time);
  }, (err) => next(err))
  .catch((err) => next(err));
})


module.exports = router;
