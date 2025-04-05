let mongoose = require('mongoose');
let { Schema } = mongoose; // Import Schema from mongoose

let menuSchema = new mongoose.Schema({
  text: { type: String, required: true },
  URL: { type: String},
  order: { type: Number, default: 0 },
  parent: 
  { type: Schema.Types.ObjectId, 
    ref: 'Menu' }
});

module.exports = mongoose.model('Menu', menuSchema);