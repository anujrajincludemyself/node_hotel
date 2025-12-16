const express = require ('express')
const router = express.Router();
const person = require('./../models/person')



router.post('/',async(req,res)=>{
    try{
       const data = req.body
       const newperson = new person(data)
       await newperson.save();
       console.log('data saved')
       res.status(200).json(newperson);
    }
    catch(error){
        console.log('error 500');
        res.status(500).json(error) 
    }

})

router.get('/',async(req,res)=>{
    try{    
    const data = await person.find()
    console.log('data saved')
    res.status(200).json(data);
    }catch(error){
        console.log('error 500');
        res.status(500).json(error) 
    }
})

router.get('/:worktype',async(req,res)=>{
try{
    const worktype = req.params.worktype;
    if(worktype=='chef' || worktype=='waiter' || worktype=='manager'){
        const response = await person.find({work: worktype})
        console.log('here it is');
        res.status(200).json(response)}
    else{
        console.log(
            'error occured '
        );
        res.status(404);
        
    } 

}
catch(error){
console.log('error occured 500');
res.status(500).json({error})
 }
})


router.put('/:id', async(req,res)=>{
   try{
    const personid = req.params.id
    const alag = req.body

    const response = await person.findByIdAndUpdate(personid,alag,{
        new: true,
        runValidators: true
    })
if(!response){
    res.status(404).json({cooked})
}
    res.status(200).json(response)
   }
    catch(err){
        console.log('error occured', err);
        res.status(500).json(err)
    }
})

router.delete('/:id' , async(req,res)=>{
    try{
        const personid = req.params.id
        const deleteid = await person.findByIdAndDelete(personid)
        res.status(200)
        if(!response){
    res.status(404).json({cooked})
}
//this is a comment
    }
    catch(err){
        console.log('error');
                res.status(500)

    //this code iss demo code 

    }
})








module.exports = router;