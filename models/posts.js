const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        username:{
            type: String,
            required: true
        },
        content:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model('posts',postSchema);

module.exports = Post;