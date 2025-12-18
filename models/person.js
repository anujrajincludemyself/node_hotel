const mongoose = require('../db');

const bcrypt = require('bcryptjs');



const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  work: {
    type: String,
    required: true,
    enum: ['chef', 'waiter', 'manager']
  },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  salary: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
});

// hash password

personSchema.pre('save', async function (next) {
  const person = this;

  if (!person.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(person.password, salt);
    person.password = hashpassword;
    next();
  } catch (err) {
    next(err);
  }
});


const Person = mongoose.model('Person', personSchema);
module.exports = Person;
