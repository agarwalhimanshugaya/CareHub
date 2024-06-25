const express = require('express');
const router = express.Router();
const {fetchsession,findsession,endsession,rejectsession,updatesession,getmedicalrecords,addmedicalrecords,addprescription,getprescription}=require("../controllers/sessions.controllers");
router.get('/',fetchsession);
router.get('/:sessionId',findsession);
router.post('/:sessionId/AddPrescription',addprescription);
router.get('/:sessionId/getPrescription',getprescription);
router.post('/:sessionId/AddMedicalRecords',addmedicalrecords);
router.get('/:sessionId/getMedicalRecord',getmedicalrecords);
router.patch('/:sessionId/accept',updatesession);
router.patch('/:sessionId/reject',rejectsession);
router.patch('/:sessionId/end',endsession);

module.exports=router;