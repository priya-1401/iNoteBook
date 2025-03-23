const mongoose=require('mongoose');
const mongoURI="mongodb+srv://lakshmipriyadwara1234:Dvlpriya%40123@cluster0.ipt3w.mongodb.net/priya?retryWrites=true&w=majority&appName=Cluster0"

const connectToMongo=async ()=>{
    await mongoose.connect(mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB is connected");
}

module.exports=connectToMongo;