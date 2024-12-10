const express = require('express')
const Instructor = require('../models/Instructor')
const router = express.Router()
const mongoose = require('mongoose');

router.get("/", async (req, res) =>{
    try{
        const instructors = await Instructor.find().populate('reviews');
        res.send(instructors)
    }
    catch(err){
        console.log("Error fetching the instructors", err)
    }
})

router.get("/:id", async (req, res) => {
  try {
    const instructorId = req.params.id;

    // Ensure the `id` is valid
    if (!mongoose.Types.ObjectId.isValid(instructorId)) {
      return res.status(400).json({ error: "Invalid instructor ID" });
    }

    const instructor = await Instructor.findById(instructorId).populate('reviews');
    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    res.status(200).json(instructor);
  } catch (err) {
    console.error("Error fetching instructor:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete('/:instructorId/deleteFeedback', async (req, res) => {
    const { instructorId } = req.params;
    const { feedbackId } = req.body;
    console.log('Deleting feedback:', feedbackId);
    
    try {
      const instructor = await Instructor.findById(instructorId);
      if (!instructor) {
        return res.status(404).json({ message: 'Instructor not found' });
      }
  
      instructor.reviews = instructor.reviews.filter((review) => review._id.toString() !== feedbackId);
      await instructor.save();
  
      res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (err) {
      console.error('Error deleting feedback:', err);
      res.status(500).json({ message: 'Failed to delete feedback' });
    }
  });
  
  
  

  router.put('/addFeedback/:instructorId', async (req, res) => {
    const { instructorId } = req.params;
    const { metrics, review } = req.body;  // Assuming the new feedback is in the request body
  
    try {
      const instructor = await Instructor.findById(instructorId);
      if (!instructor) {
        return res.status(404).json({ message: 'Instructor not found' });
      }
  
      // Add new review
      const newReview = {
        metrics,
        review,
      };
  
      instructor.reviews.push(newReview);
      await instructor.save();
  
      // Return the updated reviews array
      res.status(200).json({ reviews: instructor.reviews });
    } catch (err) {
      console.error('Error adding feedback:', err);
      res.status(500).json({ message: 'Failed to add feedback' });
    }
  });
  


router.delete('/feedback/:feedbackId', async (req, res) => {
    const { feedbackId } = req.params;

    try {
        // Find instructor and remove feedback
        const instructor = await Instructor.findOne({ 'reviews._id': feedbackId });

        if (!instructor) {
            return res.status(404).send({ message: 'Instructor or feedback not found' });
        }

        // Remove feedback by its ID
        instructor.reviews = instructor.reviews.filter((review) => review._id.toString() !== feedbackId);
        await instructor.save();

        res.status(200).send({ message: 'Feedback deleted successfully' });
    } catch (err) {
        console.error('Error deleting feedback:', err);
        res.status(500).send({ message: 'Error deleting feedback' });
    }
});

router.get("/api/instructors", async (req, res) => {
    try {
      const instructors = await Instructor.find(); // MongoDB fetch
      res.status(200).json(instructors);
    } catch (err) {
      console.error("Error fetching instructors:", err);
      res.status(500).json({ message: "Failed to fetch instructors" });
    }
  });
  

router.put('/addCourse', async (req, res) => {  
    try {  
        const { instructorsId, courseId } = req.body;  

        // Validation checks  
        if (instructorsId.length < 1 || !courseId || !Array.isArray(instructorsId)) {  
            return res.status(400).json({  
                success: false,  
                message: 'instructorsId array and courseId are required'  
            });  
        }  

        // Find all instructors that need to be updated  
        const instructors = await Instructor.find({  
            _id: { $in: instructorsId }  
        });  

        // Check if all instructors were found  
        if (instructors.length !== instructorsId.length) {  
            return res.status(404).json({  
                success: false,  
                message: 'One or more instructors not found'  
            });  
        }  

        // Update each instructor  
        const updatePromises = instructors.map(async (instructor) => {  
            // Check if course is already in instructor's courses  
            if (!instructor.courses.includes(courseId)) {  
                instructor.courses.push(courseId);  
                return instructor.save();  
            }  
            return instructor;  
        });  

        // Wait for all updates to complete  
        const updatedInstructors = await Promise.all(updatePromises);  

        res.status(200).json({  
            success: true,  
            message: 'Instructors updated successfully',  
            data: updatedInstructors  
        });  

    } catch (error) {  
        console.error('Error updating instructors:', error);  
        res.status(500).json({  
            success: false,  
            message: 'Internal server error',  
            error: error.message  
        });  
    }  
});    

module.exports = router