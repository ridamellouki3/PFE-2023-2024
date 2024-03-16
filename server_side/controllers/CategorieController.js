const Categorie = require('../models/Categorie');


const createCategorie = async (req,res) => {
    const title  = req.body.name ;
    try {
        await Categorie.create({name:title})
        return res.status(200).json({success:title + " created successfully"});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error:error.message});
    }
}


const getCategories =async (req,res)=>{
    try {
        const Categories = await Categorie.find();
        if(Categories){
            return res.status(200).json({success:Categories});
        }
        else{
            return res.status(500).json({error:"There is no Categories "});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message})}
    }


module.exports = {
    createCategorie,getCategories
}

