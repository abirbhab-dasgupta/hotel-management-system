const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');


// POST route to add a new person
router.post('/' ,async(req,res)=>{
    try{
        const data =req.body//assuming the request body contains the person data
        const newPerson = new Person(data);//create a new person document using mongoose model

       const response = await newPerson.save();//save the new person
       console.log('data saved');
       res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'intenal server error'});

    }
})

//GET method to get the person 
router.get('/' ,async(req,res)=>{
    try{
        const data = await Person.find()
        console.log('data fetched');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/:workType' ,async(req,res) =>{
    try{
        const workType = req.params.workType;
    if (workType == 'chef' || workType == 'manager' || worktype == 'waiter'){
        const response = await Person.find({work : workType});
        console.log('response fetched');
        res.status.json(response);

    }else{
        res.status(404).json({error:'invalid worktype'})
    }    

    }catch(err){
        console.log(err);
    res.status(500).json({ error: 'Internal server error' });
    }
})  

router.put('/:id' , async(req,res)=>{
    try{
        const personId = req.params.id; //extract the id from the parent URL
        const updatedPersonData = req.body; 
        const response = await Person.findByIdAndUpdate(personId,updatedPersonData)

        if (!response) {
            return res.status(404).json({ error: 'Person not found'})
        }

        console.log('data pdated');
        es.status.json(response);

    }catch(err){
        console.log(err);
    res.status(500).json({ error: 'Internal server error' });

    }
})

app.delete('/person/:id', async (req, res) => {
    try{
        const personId = req.params.id;
        const response = await Person.findByIdAndRemove(personId);

        if (!response){
            return res.status(404).json({ error: 'Person not found' });
        }
        return res.status(404).json({ error: 'Person not found' });

    }catch(err){
        console.log(err);
    res.status(500).json({ error: 'Internal server error' });
    }
})






module.exports = router;
