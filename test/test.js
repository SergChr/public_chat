const mocha = require('mocha'),
      assert = require('chai').assert;
const post = require('../controllers/post');
describe("Get all posts", () => {
   it("Should return all posts in one array", (done) => {   
      // assert.equal("2", "4");
       getPosts().then(result => {
          assert.equal(typeof result, "object");
           done();
       }, err => {
           done(err);
       });
   });
});

describe("Create a post" , () => {
    it("{data} should be a json-object", (done) => {
        createPost("data").then(result => {
          //  done(result);
        }, err => {
            assert.equal(err, "DATA should be a json-object.");
            done();
        });
    });
});

function getPosts() {
        return new Promise((resolve, reject) => {
            post.get(resolve, reject);
        });
    }

function createPost(data) {
        return new Promise((resolve, reject) => {
            post.create(data, resolve, reject);
        });
}