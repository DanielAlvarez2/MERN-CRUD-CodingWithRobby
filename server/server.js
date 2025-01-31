const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const notesController = require('./controllers/notesController.js')
require ('dotenv').config({path:'../.env'})
const app = express()
app.use(express.json()) // allows express to read json from req.body
app.use(cors())

app.get('/notes', notesController.fetchNotes)

app.get('/notes/:id', notesController.fetchNote)

app.post('/notes', notesController.createNote)

app.put('/notes/:id', notesController.updateNote)

app.delete('/notes/:id', notesController.deleteNote)

async function connectToDB(){
    await mongoose.connect(process.env.DB_URL)
        .then(console.log('Connected to MongoDB Atlas...'))
        .catch(err=>console.log(err))
}
connectToDB()
PORT = process.env.PORT || 2125

app.listen(PORT, ()=>console.log(`Express Server Running on Port: ${PORT}`))