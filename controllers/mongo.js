const mongoose = require("mongoose");
// mongoose don't have own Promise library
mongoose.Promise = Promise;
// cloud DB on mLab
const uri = "mongodb://admin:admin@ds135522.mlab.com:35522/public_chat";
mongoose.connect(uri);

let Post = mongoose.model('Post', {
    username: String,
    message: String
});

exports.Post = Post;