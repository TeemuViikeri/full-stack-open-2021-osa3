const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI

console.log('Connecting to ', uri)

// Connect to MongoDB database
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((res) => console.log('Connected MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err.message))

// Create a schema for person documents
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

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