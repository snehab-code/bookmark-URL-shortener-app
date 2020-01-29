const mongoose = require('mongoose')

const setupDb = () => {
    mongoose.connect('mongodb://localhost:27017/bookmarks-database', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('connected to db')
    })
    .catch(err => {
        console.log('db connection error', err)
    })
}
 
module.exports = setupDb