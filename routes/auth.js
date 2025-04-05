var express = require("express");
var router = express.Router();
let userControllers = require("../controllers/users");
let { check_authentication } = require("../utils/check_auth");
let jwt = require("jsonwebtoken");
let constants = require("../utils/constants");
let { body, validationResult } = require("express-validator");

router.post("/login", async function (req, res, next) {
  try {
    let username = req.body.username;
    let password = req.body.password;
    let result = await userControllers.checkLogin(username, password);
    res.status(200).send({
      success: true,
      data: jwt.sign(
        {
          id: result,
          expireIn: new Date(Date.now() + 3600 * 1000).getTime(),
        },
        constants.SECRET_KEY
      ),
    });
  } catch (error) {
    next(error);
  }
});
router.post(
  "/signup",
  [
    body("username")
      .isAlphanumeric()
      .withMessage("Username chỉ có thể là chữ hoặc số"),
    body("password")
      .isStrongPassword([
        {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        },
      ])
      .withMessage(
        "Password phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
      ),
    body("email").isEmail().withMessage("Email không hợp lệ"),
  ],
  function (req, res, next) {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(
        {
            errors: false, 
            message: errors.array() 
        });
    } else {
      next();
    }
  },
  async function (req, res, next) {
    try {
      let username = req.body.username;
      let password = req.body.password;
      let email = req.body.email;
      let result = await userControllers.createAnUser(
        username,
        password,
        email,
        "user"
      );
      res.status(200).send({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.get("/me", check_authentication, async function (req, res, next) {
  try {
    res.send({
      success: true,
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/changepassword",
  check_authentication,
  async function (req, res, next) {
    try {
      let oldpassword = req.body.oldpassword;
      let newpassword = req.body.newpassword;

      let user = userControllers.changePassword(
        req.user._id,
        oldpassword,
        newpassword
      );
      res.status(200).send({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
