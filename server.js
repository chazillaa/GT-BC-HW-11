const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs')
const db = require('./db/db.json')
const { v4: uuid } = require('uuid')

const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))

// GET index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

// GET notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// GET notes
app.get('/api/notes', (req, res) => {
    res.json(db)
})

// POST notes
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body
    const postNote = {
        title,
        text,
        id: uuid()
    }
    db.push(postNote)
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {
        if (err) throw err
        res.json(db)
        console.log('Notes have been updated')
    })
})

// Delete notes

app.listen(PORT, function () {
    console.log(`App is now listening at http://localhost:${PORT}`);
});