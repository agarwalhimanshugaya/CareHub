const express=require('express');
const router=express.Router();
const {createsession} =require("../controllers/consultations.controllers");

router.post('/',createsession);

module.exports=router;