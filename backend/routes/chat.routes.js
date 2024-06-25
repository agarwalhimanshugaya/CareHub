const express = require('express');
const router = express.Router();
const {sendmessage,getmessage} =require("../controllers/chat.controllers");

router.post('/send',sendmessage);
router.get('/:sessionId',getmessage);

module.exports=router;