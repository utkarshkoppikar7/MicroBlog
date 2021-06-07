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
        },
        image:{
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const Post = mongoose.model('posts',postSchema);

module.exports = Post;