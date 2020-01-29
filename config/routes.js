const express = require('express')
const router = express.Router()

const bookmarksController = require('../controllers/bookmarksController')

router.get('/', (req, res) => {
    res.json('Welcome to bookmark url shortener app')
})

router.get('/bookmarks', bookmarksController.list)
router.get('/bookmarks/:id', bookmarksController.show)
router.post('/bookmarks', bookmarksController.create)
router.put('/bookmarks/:id', bookmarksController.update)
router.delete('/bookmarks/:id', bookmarksController.destroy)



module.exports = router