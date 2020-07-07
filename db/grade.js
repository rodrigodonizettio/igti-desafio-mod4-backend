import mongoose from 'mongoose'

const GRADES_COLLECTION = 'grades'
const GRADE = 'grade'

const gradeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true,
    validate(balance) {
      if(balance < 0) throw new Error('Value cannot be < 0')
    }
  },
  lastModified: {
    type: Date,
    default: Date.now()
  }
})

const gradeModel = mongoose.model(GRADE, gradeSchema, GRADES_COLLECTION)

export { gradeModel }