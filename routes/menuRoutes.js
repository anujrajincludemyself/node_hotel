const express = require ('express')
const router = express.Router();
const person = require('./../models/menuitem')


router.post('/',async(req,res)=>{
    try{
         const data = req.body
         const finalmenu = new menuitem(data)
         await finalmenu.save()  
         console.log('data saved')
        res.status(200).json(finalmenu);

    }catch(error){
        console.log('error 500');
        res.status(500).json(error) 
    }
})


router.get('/',async(req,res)=>{
    try{
         const data = await finalmenu.find()
         console.log('data saved')
        res.status(200).json(finalmenu);

    }catch(error){
        console.log('error 500');
        res.status(500).json(error) 
    }
})

module.exports = router;