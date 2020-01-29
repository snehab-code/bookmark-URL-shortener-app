const Bookmark = require('../models/Bookmark')
const sh = require('shorthash')
const validator = require('validator')

module.exports.list = (req, res) => {
    Bookmark.find()
        .then(bookmarks => {
            res.json(bookmarks)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Bookmark.findById(id)
        .then(bookmark => {
            res.json(bookmark)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.listByTag = (req, res) => {
    const name = req.params.name
    Bookmark.find({tags: name})
        .then(bookmarks => {
            if (bookmarks) {
                res.json(bookmarks)
            } else {
                res.json([])
            }
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.listByTags = (req, res) => {
    if (req.query.names) {
        const tagsArray = req.query.names.split(',')
        Bookmark.find({tags: {'$in': tagsArray}})
            .then(bookmarks => {
                if (bookmarks) {
                    res.json(bookmarks)
                } else {
                    res.json([])
                }
            })
            .catch(err => {
                res.json(err)
            })
    } else {
        res.json([])
    }
}

module.exports.create = (req, res) => {
    const body = {
        title: req.body.title,
        originalUrl: req.body.original_url,
        tags: req.body.tags,
    }
    console.log(body)
    if (body.originalUrl && validator.isURL(body.originalUrl)) {
        body.hashedUrl = sh.unique(body.originalUrl)
        const bookmark = new Bookmark(body)
        bookmark.save()
            .then(bookmark => {
                res.json(bookmark)
            })
            .catch(err => {
                res.json(err)
            })
    } else {
        res.json({error: 'String is not a URL'})
    }
}

module.exports.update = (req, res) => {
    const body = req.body
    const id = req.params.id
    Bookmark.findByIdAndUpdate(id, body, {new: true, runValidators: true})
        .then(bookmark => {
            res.json(bookmark)
        })
        .catch(err => {
            res.json(err)
        })
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    Bookmark.findByIdAndDelete(id)
        .then(bookmark => {
            res.json(bookmark)
        })
        .catch(err => {
            res.json(err)
        })
}