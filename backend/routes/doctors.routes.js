const express = require('express');
const router = express.Router();
const {fetchdoctors,getdoctor,addreview,fetchreview,availabilityupdate} =require("../controllers/doctors.controllers");
router.get('/',fetchdoctors);
router.get('/:id',getdoctor);
router.post('/:doctorId/reviews',addreview);
router.get('/:id/fetchreviews',fetchreview);
router.patch('/:id/update-availability',availabilityupdate);

module.exports=router;