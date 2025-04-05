const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  text: { type: String, required: true },
  URL: { type: String, required: true },
  order: { type: Number, required: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Menu', default: null }
});

module.exports = mongoose.model('Menu', menuSchema);