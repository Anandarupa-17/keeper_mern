import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({origin: true, credentials: true}))

const pass = encodeURIComponent(process.env.PASS);
const user = process.env.USER;
var db1 = mongoose.connect('mongodb+srv://dummyuser:dummyuser123@cluster0.o9goxoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{useNewUrlParser:true, useUnifiedTopology:true});
var db = mongoose.connection;

const keeperSchema = {
    title: String,
    content: String
}

const Keeper = mongoose.model("Keeper", keeperSchema);

app.get("/api/getAll",(req,res)=> {
    Keeper.find({}).then(function(KeeperList){
        res.send(KeeperList);
    })
})

app.post("/api/addNew",(req,res)=> {
    const {title, content} = req.body;
    const keeperObj = new Keeper({
        title: title,
        content:content
    }); 
    keeperObj.save();
    res.redirect("/api/getAll");
})

app.post("/api/delete",(req,res)=> {
    const {id} = req.body;
    Keeper.deleteOne({_id:id}).then(function(){
        res.redirect("/api/getAll");
    })
})

app.listen(process.env.PORT || 6000, ()=> {
    console.log("backend created at port 6000");
})