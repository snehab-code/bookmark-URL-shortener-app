const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookmarkSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    originalUrl: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    hashedUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Bookmark = mongoose.model('Bookmark', bookmarkSchema)

module.exports = Bookmark