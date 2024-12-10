require('dotenv').config();  // for environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const departments = require('./routes/departments');
const instructors = require('./routes/instructors');
const courses = require('./routes/courses');
const resources = require('./routes/resources');
const authRoutes = require('./routes/auth'); // Import the auth router
const users = require('./routes/users');
const groups = require('./routes/groups');
const uploadRoutes = require('./routes/uploads');
const Experience = require('./routes/experiences');

const PORT = process.env.PORT || 8080; // Ensure default port is 8080

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log("Connected to the DB");

    // Initialize GridFSBucket
    const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads',
    });
    app.locals.gfs = gfs;
    console.log('GridFS initialized');

    // Initialize and use upload routes with gfs
    app.use('/upload', uploadRoutes);

    // Other routes
    app.use('/auth', authRoutes);
    app.use('/api/departments', departments);
    app.use('/api/instructors', instructors);
    app.use("/api/courses", courses);
    app.use('/api/users', users);
    app.use('/api/resources', resources);
    app.use("/api/groups", groups);
    app.use("/api/experiences", Experience);

    // Start the server after all routes are set up
    app.listen(PORT, () =>{
        console.log("Server is running on port", PORT);
    });
})
.catch((err) =>{
    console.log("Failed to connect to the DB", err);
});
