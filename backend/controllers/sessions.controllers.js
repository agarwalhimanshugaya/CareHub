const Consultation = require('../models/Consultation.models');
const Prescription = require('../models/Prescription.models');
const MedicalRecord = require('../models/MedicalRecord.models');
const asyncHandler=require('express-async-handler');

const fetchsession=asyncHandler(async(req,res)=>{
    const { userId, userType } = req.query;

  try {
    let sessions;

    if (userType === 'doctor') {
      // Fetch sessions where the doctorId matches userId
      sessions = await Consultation.find({ doctorId: userId });
    } else {
      // Fetch sessions where the patientId matches userId
      sessions = await Consultation.find({ patientId: userId });
    }

    res.json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

const findsession=asyncHandler(async(req,res)=>{
    try {
        const sessionId = req.params.sessionId;
        const session = await Consultation.findById(sessionId);
    
        if (!session) {
          return res.status(404).json({ message: 'Session not found' });
        }
    
        // Return session details
        res.json(session);
      } catch (error) {
        console.error('Error fetching session details:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
});

const addprescription=asyncHandler(async(req,res)=>{
    const sessionId = req.params.sessionId;

  prescription = await Prescription.create({
    sessionId: sessionId, 
    image: req.body.image,
    details: req.body.details,
    createdAt: req.body.time,
  });
  res.status(200).send("Prescription added successfully")
});

const getprescription=asyncHandler(async(req,res)=>{
    try {
        const sessionId = req.params.sessionId;
        const pres = await Prescription.find({sessionId :sessionId});
    
        if (!pres) {
          return res.status(404).json({ message: 'prescription not found' });
        }
    
        // Return session details
        res.json(pres);
      } catch (error) {
        console.error('Error fetching prescription details:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
});

const addmedicalrecords=asyncHandler(async(req,res)=>{
    const sessionId = req.params.sessionId;

    medicalRecord = await MedicalRecord.create({
      sessionId: sessionId, 
      image: req.body.image,
      details: req.body.details,
      createdAt: req.body.time,
    });
    res.status(200).send("Medical Record added successfully")
});

const getmedicalrecords=asyncHandler(async(req,res)=>{
    try {
        const sessionId = req.params.sessionId;
        const md = await MedicalRecord.find({sessionId :sessionId});
    
        if (!md) {
          return res.status(404).json({ message: 'medical record not found' });
        }
    
        res.json(md);
      } catch (error) {
        console.error('Error fetching medical record details:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
});

const updatesession=asyncHandler(async(req,res)=>{
    try {
        const sessionId = req.params.sessionId;
        const updatedSession = await Consultation.findByIdAndUpdate(sessionId, { status: 'Active' }, { new: true });
        res.json(updatedSession);
      } catch (error) {
        console.error('Error accepting session:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
});

const rejectsession=asyncHandler(async(req,res)=>{
    try {
        const sessionId = req.params.sessionId;
        const updatedSession = await Consultation.findByIdAndUpdate(sessionId, { status: 'Rejected' }, { new: true });
        res.json(updatedSession);
      } catch (error) {
        console.error('Error rejecting session:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
});

const endsession=asyncHandler(async(req,res)=>{
    try {
        const sessionId = req.params.sessionId;
        const updatedSession = await Consultation.findByIdAndUpdate(sessionId, { status: 'Completed' }, { new: true });
        res.json(updatedSession);
      } catch (error) {
        console.error('Error rejecting session:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
});

module.exports= {fetchsession,findsession,endsession,rejectsession,updatesession,getmedicalrecords,addmedicalrecords,addprescription,getprescription};