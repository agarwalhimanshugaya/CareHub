const express=require("express");
const router=express.Router();
const {register,login,getuser,createdoctor}= require( "../controllers/auth.controllers");
const { body} = require('express-validator');
var fetchuser = require('../middleware/auth.middleware');
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ], register);

  router.post('/createdoctor', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
    body('speciality', 'Speciality is required for doctors').notEmpty(),
    body('experience', 'Experience is required for doctors').notEmpty(),
    body('location', 'Location is required for doctors').notEmpty(),
  ],createdoctor);

  router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ],login);

  router.post('/getuser', fetchuser,getuser);

module.exports=router