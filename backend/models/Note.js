const mongoose=require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  title:{
    type:String,
    requires:true
  },
  description:{
    type:String,
    requires:true,
  },
  tag:{
    type:String,
    default:"General"
  },
  date:{
    type:Date,
    requires:Date.now
  },
});
module.exports=mongoose.model('notes',NotesSchema);