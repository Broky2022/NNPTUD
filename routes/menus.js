let express = require('express');
let router = express.Router();
let Menu = require('../schemas/menu');

// Create a new menu
router.post('/', async (req, res) => {
  try {
    let { text, URL, order, parent } = req.body;
    let newMenu = new Menu({ text, URL, order, parent });

    // Save the new menu
    await newMenu.save();

    // Fetch menus without parent
    let menusWithoutParent = await Menu.find({ parent: null });

    // Fetch children for each menu without parent
    let result = [];
    for (let menu of menusWithoutParent) {
      let children = await Menu.find({ parent: menu._id });
      result.push({
        parent: menu,
        children: children
      });
    }

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Read all menus
router.get('/', async (req, res) => {
  try {
    // Fetch menus without parent
    let menusWithoutParent = await Menu.find({ parent: null });

    // Fetch children for each menu without parent
    let result = [];
    for (let menu of menusWithoutParent) {
      let children = await Menu.find({ parent: menu._id });
      result.push({
        parent: menu,
        children: children
      });
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Read a single menu by ID
router.get('/:id', async (req, res) => {
  try {
    let menu = await Menu.findById(req.params.id).populate('parent', 'text');
    if (!menu) {
      return res.status(404).json({ success: false, message: 'Menu not found' });
    }
    res.status(200).json({ success: true, data: menu });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;