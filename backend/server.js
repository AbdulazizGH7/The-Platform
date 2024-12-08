const PORT = process.env.PORT || 5000
const express = require('express')

const app = express()

app.listen(PORT, () =>{
    console.log("Server is running on port", PORT)
})
