const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const departments = require('./routes/departments')
const instructors = require('./routes/instructors')
const courses = require('./routes/courses')
const resources = require('./routes/resources')
const authRoutes = require('./routes/auth'); // Import the auth router
const uploadRoutes = require('./routes/uploads');
const users = require('./routes/users');
const groups = require('./routes/groups')

require('dotenv').config();  // for environment variables

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors());
app.use(express.json())


mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("Connected to the DB")
    app.listen(PORT, () =>{
        console.log("Server is running on port", PORT)
    })
})
.catch((err) =>{
    console.log("Failed to connect to the DB", err)
})

// Routes
app.use('/auth', authRoutes);
app.use('/api/departments', departments)
app.use('/api/instructors', instructors)
app.use("/api/courses", courses)
app.use('/api/users', users);
app.use('/api/resources', resources);
app.use('/upload', uploadRoutes);

app.use("/api/groups", groups)
