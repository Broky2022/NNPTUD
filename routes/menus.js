const express = require('express');
const router = express.Router();
const Menu = require('../schemas/menu');

// Create a new menu
router.post('/', async (req, res) => {
  try {
    const { text, URL, order, parent } = req.body;
    const newMenu = new Menu({ text, URL, order, parent });
    await newMenu.save();
    res.status(201).json({ success: true, data: newMenu });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Read all menus
router.get('/', async (req, res) => {
  try {
    const menus = await Menu.find().populate('parent', 'text');
    res.status(200).json({ success: true, data: menus });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Read a single menu by ID
router.get('/:id', async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate('parent', 'text');
    if (!menu) {
      return res.status(404).json({ success: false, message: 'Menu not found' });
    }
    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update a menu by ID
router.put('/:id', async (req, res) => {
  try {
    const { text, URL, order, parent } = req.body;
    const menu = await Menu.findByIdAndUpdate(
      req.params.id,
      { text, URL, order, parent },
      { new: true, runValidators: true }
    );
    if (!menu) {
      return res.status(404).json({ success: false, message: 'Menu not found' });
    }
    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete a menu by ID
router.delete('/:id', async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) {
      return res.status(404).json({ success: false, message: 'Menu not found' });
    }
    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;