const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const cors = require('cors');
const departments = require('./routes/departments')
const instructors = require('./routes/instructors')
const courses = require('./routes/courses')
const User = require('./models/User')

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

// ============ REGISTERATION ENDPOINTS ============

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
  
    let errors = {
      usernameTaken: false,
      emailTaken: false,
    };
  
    // Validate username
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      errors.usernameTaken = true;
    }
  
    // Validate email
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      errors.emailTaken = true;
    }
  
    console.log("The errors are:", JSON.stringify(errors));
  
    // If there are errors, return the error object
    if (errors.usernameTaken || errors.emailTaken) {
      return res.status(400).json(errors);
    }
  
    // If no errors, create and save the new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

  
    res.status(201).json({ message: 'User registered successfully' });
  });

// Login Endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists by email
  const user = await User.findOne({ email }).populate('courses');
  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  // Return full user data. In a real app, you'd return a token here, too.
  res.status(200).json({ 
    message: 'Login successful',
    user: {
      username: user.username,
      email: user.email,
      role: user.role,
      courses: user.courses,
      //groups: user.groups
    }
  });
});

// Routes
app.use('/api/departments', departments)
app.use('/api/instructors', instructors)
app.use("/api/courses", courses)