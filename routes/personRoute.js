const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const { jwtAuthMiddleware, generateToken } = require('../jwt');
const bcrypt = require('bcryptjs');



// SIGNUP / SIGNIN
router.post('/signin', async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);
    await newPerson.save();

    // ✅ generate token like your screenshot
    const token = generateToken({
      id: newPerson._id,
      username: newPerson.username
    });

    res.status(200).json({
      response: newPerson,
      token: token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Person.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
//sample commit
    const payload = {
      id: user._id,
      username: user.username
    };

    const token = generateToken(payload);
    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// GET ALL PERSONS
router.get('/',jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/profile',jwtAuthMiddleware,async(req,res) =>{
    try{
        const userdata = req.user;

        const userid = userdata.id;
        const user = await Person.findById(userid)

        res.status(200).json({user})

    }catch(err){
        res.status(500).json(err)
    }
})

// GET BY WORK TYPE
router.get('/:worktype', async (req, res) => {
  try {
    const worktype = req.params.worktype;

    if (!['chef', 'waiter', 'manager'].includes(worktype)) {
      return res.status(400).json({ error: 'Invalid work type' });
    }

    const response = await Person.find({ work: worktype });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE BY ID
router.put('/:id', async (req, res) => {
  try {
    const response = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!response) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE BY ID
router.delete('/:id', async (req, res) => {
  try {
    const response = await Person.findByIdAndDelete(req.params.id);

    if (!response) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.status(200).json({ message: 'Person deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
