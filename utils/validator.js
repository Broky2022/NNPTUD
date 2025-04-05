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
      return res.status(400).send({
        errors: false,
        message: errors.array(),
      });
    } else {
      next();
    }
  },
  userValidation: [
    body("username").isAlphanumeric().withMessage(constants.ERROR_USERNAME),
    body("password").isStrongPassword(options.password).withMessage(
        utils.format(constants.ERROR_PASSWORD,
            options.password.minLength,
            options.password.minUppercase,
            options.password.minLowercase,
            options.password.minNumbers,
            options.password.minSymbols)
    ),
    body("email").optional().isEmail().withMessage(constants.ERROR_EMAIL),
  ],
  loginValidation: [
    body("username")
      .isAlphanumeric()
      .withMessage(constants.ERROR_USERNAME),
    body("password")
      .isStrongPassword(options.password)
      .withMessage(
        utils.format(constants.ERROR_PASSWORD,
        options.password.minLength,
        options.password.minUppercase,
        options.password.minLowercase,
        options.password.minNumbers,
        options.password.minSymbols)),
  ],
};
