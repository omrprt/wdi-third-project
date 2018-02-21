const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  amount: { type: String },
  bringer: { type: mongoose.Schema.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

itemSchema.set('toJSON', { virtuals: true });

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

commentSchema.set('toJSON', { virtuals: true });

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  description: { type: String },
  date: { type: Date },
  location: {
    firstLine: { type: String },
    secondLine: { type: String },
    city: { type: String },
    postal_code: { type: String, required: true },
    lat: { type: Number },
    lng: { type: Number }
  },
  image: String,
  eventKey: Number,
  guests: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  items: [ itemSchema ],
  comments: [ commentSchema ],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  photos: []
});

eventSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Event', eventSchema);
