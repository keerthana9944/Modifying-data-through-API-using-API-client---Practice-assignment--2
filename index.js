const express= require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const menuItem = require("./model/menuSchema");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.get("/", (req,res) => {
    res.send("Server is running successfully");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err)=> console.error("Connection failed", err));


//Updating existing menu items
app.put("/menu/:id", async(req, res) => {
    try{
        const {name, description, price} = req.body;
        const updateitems = await menuItem.findByIdAndUpdate(req.params.id, {name,description,price}, {new:true});

        if(!updateitems){
            res.status(404).json({message: "Items not found"});
        }
        res.json(updateitems);
    }

    catch(error){
        res.status(500).json({message: error.message});
    }
});

//Deleting a menu item
app.delete("/menu/:id", async(req,res) => {
    try{
        const deleteItem = await menuItem.findByIdAndDelete(req.params.id);

        if(!deleteItem){
            res.status(404).json({message: "Items not found"});
        };

        res.status(200).json({message:"deleted successfully"});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
