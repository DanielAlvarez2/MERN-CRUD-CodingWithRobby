const Note = require('../models/note.js')

module.exports = {
    fetchNotes: async (req,res)=>{
        await Note.find()
            .then(result=>res.json(result))
            .catch(err=>console.log(err))
    },
    fetchNote: async (req,res)=>{
        await Note.findById(req.params.id)
            .then(result=>res.json(result))
            .catch(err=>console.log(err))
    },
    createNote: async (req,res)=>{
        const {title,body} = req.body
        await Note.create({title,body})
            .then(result=>res.json(result))
            .catch(err=>console.log(err))
    },
    updateNote: async(req,res)=>{
        await Note.findByIdAndUpdate({_id:req.params.id},
                                     {title:req.body.title,
                                      body:req.body.body
                                     })
            .then()
            .catch(err=>console.log(err))
        await Note.findById(req.params.id)
            .then(result=>res.json(result))
            .catch(err=>console.log(err))
    },
    deleteNote: async (req,res)=>{
        await Note.findByIdAndDelete({_id:req.params.id})
            .then(result=>res.json(result))
            .catch(err=>console.log(err))
    }
}
