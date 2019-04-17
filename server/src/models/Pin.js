import mongoose from 'mongoose'

const PinSchema = new mongoose.Schema(
  {
    createdAt: String,
    title: String,
    content: String,
    image: String,
    latitude: Number,
    longitude: Number,
    author: { type: mongoose.Schema.ObjectId, ref: 'User' },
    comments: [
      {
        title: String,
        createdAt: { type: Date, default: Date.now },
        author: { type: mongoose.Schema.ObjectId, ref: 'User' }
      }
    ]
  },
  { timestamps: true }
)

const Pin = mongoose.model('Pin', PinSchema)

export default Pin
