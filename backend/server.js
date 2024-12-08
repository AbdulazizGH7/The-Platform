const express = require('express')
const mongoose = require('mongoose')
const Department = require('./models/Department')
const departments = require('./routes/departments')
const Course = require('./models/Course')
const User = require('./models/User')

require('dotenv').config();  // for environment variables

const PORT = process.env.PORT || 5000

const app = express()

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
app.use('/api/departments', departments)




