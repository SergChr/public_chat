const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const post = require('../controllers/post');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('chat');
});

router.post('/api/posts/create', (req, res, next) => {
    let data = JSON.stringify({
        username: req.body.username,
        message: req.body.message
    });
    // I use req.body because {data} should be parsed
    if(req.body.message.length > 200 || req.body.message.length == 0) {
        res.send("Message text cannot be empty or more than 200 symbols!");
        return;
    }
    if(req.body.username.match(/([~!@#$%^&*()_+}{"?>:<,.\/])/gi)) {
        res.send("Username can contain only numbers and letters!");
        return;
    }
    
    function createPost(data) {
        return new Promise((resolve, reject) => {
            post.create(data, resolve, reject);
        });
    }
    createPost(data).then(result => {
      res.send(result);
    }, err => {
        console.log(err);
    });
});

router.get('/api/posts/', (req, res, next) => {
    function getPosts() {
        return new Promise((resolve, reject) => {
            post.get(resolve, reject);
        });
    }
    
    getPosts().then(result => {
        let data = JSON.stringify(result);
        res.send(data);
    }, err => {
        res.send(err);
    });
});

router.get('/tests', (req, res, next) => {
    res.render("tests");
})

module.exports = router;
