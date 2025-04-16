let { body, validationResult } = require("express-validator");
let constants = require("./constants");
let utils = require('util')

let options = {
  password: {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }
};

module.exports = {
  validate: function (req, res, next) {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).send({
        errors: false,
        message: errors.array(),
      });
    } else {
      next();
    }
  },
  userValidation: [
    body("email").isEmail().withMessage(constants.ERROR_EMAIL),
    body("password").isString().withMessage(constants.ERROR_PASSWORD),
  ],
};
