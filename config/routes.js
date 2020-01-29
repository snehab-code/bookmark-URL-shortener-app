const express = require('express')
const router = express.Router()
const Bookmark = require('../models/Bookmark')

const bookmarksController = require('../controllers/bookmarksController')

router.get('/', (req, res) => {
    res.json('Welcome to bookmark url shortener app')
})

router.get('/bookmarks', bookmarksController.list)
router.get('/bookmarks/tags', bookmarksController.listByTags)
router.get('/bookmarks/:id', bookmarksController.show)
router.post('/bookmarks', bookmarksController.create)
router.put('/bookmarks/:id', bookmarksController.update)
router.delete('/bookmarks/:id', bookmarksController.destroy)


router.get('/bookmarks/tags/:name', bookmarksController.listByTag)

router.get('/:hash', (req, res) => {
    const hash = req.params.hash
    Bookmark.find({hashedUrl: hash})
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
})

module.exports = router