var firebaseConfig = {
  apiKey: "AIzaSyDU2-mdRegFPE0hj8Fo2ZTQnQSfU6LXrd0",
  authDomain: "web-eddie.firebaseapp.com",
  databaseURL: "https://web-eddie.firebaseio.com",
  projectId: "web-eddie",
  storageBucket: "web-eddie.appspot.com",
  messagingSenderId: "855618318554",
  appId: "1:855618318554:web:0bf1d3df5e3b25356675e3",
  measurementId: "G-VFFF25V6F1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
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
