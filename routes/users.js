var express = require('express');
var router = express.Router();
let userSchema = require('../schemas/user');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const { username, fullName, minLogin, maxLogin } = req.query;
    let query = { isDeleted: false };
    if (username) query.username = new RegExp(username, 'i');
    if (fullName) query.fullName = new RegExp(fullName, 'i');
    if (minLogin) query.loginCount = { $gte: Number(minLogin) };
    if (maxLogin) query.loginCount = { ...query.loginCount, $lte: Number(maxLogin) };
    
    let users = await userSchema.find(query).populate('role');
    res.status(200).send({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message
    });
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let user = await userSchema.findById(id).populate('role');
    res.status(200).send({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error.message
    });
  }
});

router.post('/', async function(req, res, next) {
  try {
    let body = req.body;
    let newUser = new userSchema({
      username: body.username,
      password: body.password,
      email: body.email,
      fullName: body.fullName || "",
      avatarUrl: body.avatarUrl || "",
      status: body.status || false,
      role: body.role,
      loginCount: body.loginCount || 0
    });
    await newUser.save();
    res.status(200).send({
      success: true,
      data: newUser
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error.message
    });
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let user = await userSchema.findById(id);
    if (user) {
      let body = req.body;
      if (body.username) user.username = body.username;
      if (body.password) user.password = body.password;
      if (body.email) user.email = body.email;
      if (body.fullName) user.fullName = body.fullName;
      if (body.avatarUrl) user.avatarUrl = body.avatarUrl;
      if (body.status !== undefined) user.status = body.status;
      if (body.role) user.role = body.role;
      if (body.loginCount !== undefined) user.loginCount = body.loginCount;
      
      await user.save();
      res.status(200).send({
        success: true,
        data: user
      });
    } else {
      res.status(404).send({
        success: false,
        message: "ID không tồn tại"
      });
    }
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error.message
    });
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let user = await userSchema.findById(id);
    if (user) {
      user.isDeleted = true;
      await user.save();
      res.status(200).send({
        success: true,
        data: user
      });
    } else {
      res.status(404).send({
        success: false,
        message: "ID không tồn tại"
      });
    }
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error.message
    });
  }
});

router.post("/verify", async function (req, res) {
  try {
    let { email, username } = req.body;
    if (!email || !username) throw new Error("Vui lòng cung cấp email và username");

    // Tìm user có email và username trùng khớp, chưa bị xóa mềm
    let user = await userSchema.findOne({ email, username, isDeleted: false });
    if (!user) throw new Error("Thông tin không hợp lệ");

    // Cập nhật status thành true
    user.status = true;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Xác minh thành công, status đã được cập nhật",
      data: user,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
