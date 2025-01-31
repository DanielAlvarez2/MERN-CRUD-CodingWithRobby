const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Note = require('./models/note.js')
require ('dotenv').config({path:'../.env'})
const app = express()
app.use(express.json()) // allows express to read json from req.body
app.use(cors())
app.get('/',(req,res)=>res.json({hello:"world!!!"}))

app.get('/notes', async (req,res)=>{
    await Note.find()
        .then(result=>res.json(result))
        .catch(err=>console.log(err))
})

app.get('/notes/:id', async (req,res)=>{
    await Note.findById(req.params.id)
        .then(result=>res.json(result))
        .catch(err=>console.log(err))
})

app.post('/notes', async (req,res)=>{
    const {title,body} = req.body
    await Note.create({title,body})
        .then(result=>res.json(result))
        .catch(err=>console.log(err))
})

app.put('/notes/:id', async(req,res)=>{
    await Note.findByIdAndUpdate({_id:req.params.id},
                                 {title:req.body.title,
                                  body:req.body.body
                                 })
        .then()
        .catch(err=>console.log(err))
    await Note.findById(req.params.id)
        .then(result=>res.json(result))
        .catch(err=>console.log(err))
})

app.delete('/notes/:id', async (req,res)=>{
    await Note.findByIdAndDelete({_id:req.params.id})
        .then(result=>res.json(result))
        .catch(err=>console.log(err))
})

async function connectToDB(){
    await mongoose.connect(process.env.DB_URL)
        .then(console.log('Connected to MongoDB Atlas...'))
        .catch(err=>console.log(err))
}
connectToDB()
PORT = process.env.PORT || 2125

app.listen(PORT, ()=>console.log(`Express Server Running on Port: ${PORT}`))