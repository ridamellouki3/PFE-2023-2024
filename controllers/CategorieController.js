const Categorie = require('../models/Categorie');


const createCategorie = async (req,res) => {
    const title  = req.body.name ;
    try {
        await Categorie.create({name:title})
        return res.status(200).json(title + " created successfully");
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
}


const getCategories =async (req,res)=>{
    try {
        const Categories = await Categorie.find();
        if(Categories){
            return res.status(200).json(Categories);
        }
        else{
            return res.status(500).json("There is no Categories ");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message)}
    }


module.exports = {
    createCategorie,getCategories
}

