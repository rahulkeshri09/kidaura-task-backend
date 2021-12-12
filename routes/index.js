const express=require('express');
const router=express.Router();
const taskController=require('../controller/tasksController');
router.get('/',taskController.home);
router.post('/create',taskController.create);
router.get('/fetch',taskController.fetch);
router.post('/update/:id',taskController.update);
router.delete('/delete/:id',taskController.delete);
module.exports=router;