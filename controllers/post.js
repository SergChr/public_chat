const mongo = require("./mongo");

exports.create = (req, resolve, reject) => {
    if(typeof req !== "object") {
        reject("DATA should be a json-object.");
        return;
    }
    let data = JSON.parse(req);
   // console.log(data);
    let newPost = new mongo.Post({ username: data.username, message: data.message });
    newPost.save((err) => {
        if(err) {
            reject(err);
        } else {
            resolve("OK");
        }
    })
}

exports.get = (resolve, reject) => {
    resolve(mongo.Post.find({  }, {_id:0, __v:0}));
}