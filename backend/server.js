const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000

const app = express()

mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("Connected to the DB")
})
.catch((err) =>{
    console.log("Failed to connect to the DB", err)
})

app.listen(PORT, () =>{
    console.log("Server is running on port", PORT)
})
