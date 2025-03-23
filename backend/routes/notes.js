const express=require('express')
const router=express.Router()
const fetchuser = require('../middleware/fetchuser');
const Note=require('../models/Note')
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    const notes=await Note.find({user:req.user.id})
    res.json(notes)
})

router.post('/addnote',fetchuser,[
    body('title','Enter a valid title').isLength({min: 3}),
    body('description','Enter a valid discription').isLength({min: 5}),
],async (req,res)=>{
    try{
        const {title,description,tag}=req.body
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const note=new Note({
            title,description,tag,user:req.user.id
        })
        const savednote=await note.save()
        res.json(savednote)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal error occured");
    }
})

router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const {title,description,tag}=req.body
    const newnote={};
    if(title){
        newnote.title=title;
    }
    if(description){
        newnote.description=description;
    }
    if(title){
        newnote.tag=tag;
    }
    let note=await Note.findById(req.params.id);
    if(!note) {return res.status(404).send("Not Found")}
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("NOT Allowed");
    }
    note=await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
    res.json({note});
})

router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    let note=await Note.findById(req.params.id);
    if(!note) {return res.status(404).send("Not Found")}
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("NOT Allowed");
    }
    note=await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted"});
})

module.exports=router