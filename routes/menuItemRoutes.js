const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

// POST method to add item in menu
router.post('/' ,async(req,res)=>{
    try{
        const MenuItemData =req.body//assuming the request body contains the menu  data
        const menuItem = new MenuItem(MenuItemData);//create a new menu item document using mongoose model

       const saved_menu= await menuItem.save();//save the new menuitem
       console.log('data saved');
       res.status(200).json(saved_menu);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});

    }
})


router.get('/' , async (req,res) =>{
    try{
        const menuItems = await MenuItem.find(); // Send the list of menu items as a JSON response
        res.json(menuItems);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})      
        
        
router.get('/taste', async (req,res) =>{
    try{
        const tasteType = req.params.taste; // // Extract the taste type from the URL parameter
        if(tasteType == 'sweet' || tasteType == 'sour' || tasteType =='spicy' ){
            const response = await MenuItem.find({taste: tasteType});
        console.log('response fetched');
        res.status(200).json(response);
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
}) 

router.put('/:id', async (req, res)=>{
    try{
        const menuId = req.params.id;
        const updateMenuIData= req.body;
        const response = await MenuItem.findByIdAndUpdate(menuId,updateMenuData)
        if(!response){
            return res.status(404).json({ error: 'Menu Item not found' });
        }
        console.log('data updated');
        res.status(200).json(response);    

    }catch(err){
        console.log(err);
    res.status(500).json({ error: 'Internal server error' });
    }

})

router.delete('/:id', async (req, res) =>{
    try{
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndRemove(menuId);
        if(!response){
            return res.status(404).json({ error: 'Menu Item not found' });
        }
        console.log('data delete');
        res.status(200).json({message: 'Menu Deleted Successfully'});  

    }catch(err){
        console.log(err);
    res.status(500).json({ error: 'Internal server error' });
    }

})


 module.exports =  router;  