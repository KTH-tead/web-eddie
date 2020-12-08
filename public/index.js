var express = require('index');
var router = express.Router();

/* GET home page. */
router.get('/',function(req, res, next) {
  res.render('index', { title:'index' });
});

router.get('/test',function(req, res, next) {
      res.render('test');
});

module.exports = router;