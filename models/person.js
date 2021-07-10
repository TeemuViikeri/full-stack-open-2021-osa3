const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

const uri = process.env.MONGODB_URI

// Connect to MongoDB database
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err.message))

// Create a schema for person documents
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  number: {
    type: String,
    unique: true,
    minlength: 8,
  },
})

personSchema.plugin(validator)

// Apply these changes to JSON document sent from the database
// toJSON is called by JSON.stringify()
// Note: Express' res.json() uses JSON.stringify() when sending JSON in response body
personSchema.set('toJSON', {
  transform: (document, returnedPerson) => {
    returnedPerson.id = returnedPerson._id.toString()
    delete returnedPerson._id
    delete returnedPerson.__v
  },
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
