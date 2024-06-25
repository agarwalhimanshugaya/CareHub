const Consultation=require('../models/Consultation.models');
const asyncHandler=require('express-async-handler');

const createsession=asyncHandler(async(req,res)=>{
    try {
    
        const { doctorId, patientId,problem, symptoms,doctorName, patientName} = req.body;
    
        if (!doctorId || !problem || !symptoms) {
          return res.status(400).json({ success: false, error: 'Missing required fields' });
        }
    
        // Create a session of consultation
        const newSession = new Consultation({
          patientId: patientId,
          doctorId: doctorId,
          doctorName,
          patientName,
          startTime: new Date(),
          endTime: '',
          status: 'Pending',
          problem,
          symptoms,
        });
    
        
        await newSession.save();
    
        // Return the newly added review
        res.status(201).json(newSession);
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

module.exports ={createsession};