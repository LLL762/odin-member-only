import { body } from "express-validator";
import { appUserProperties } from "../model/AppUser";
import v from "../validation/ValidationUtility";

const validationRules = () => [
  validateUsername(),
  validateEmail(),
  validatePassword(),
  validateFirstName(),
  validateLastName(),
];

const validateUsername = () =>
  body("username")
    .trim()
    .isLength({
      min: appUserProperties.defaultMinLength,
      max: appUserProperties.defaultMaxLength,
    })
    .withMessage(
      `Username must be between ${appUserProperties.defaultMinLength} and  ${appUserProperties.defaultMaxLength}`
    )
    .bail()
    .custom(v.doesNotContainBlackListChars)
    .withMessage("username: " + v.getContainsBlackListCharsMsg());

const validateEmail = () =>
  body("email")
    .trim()
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage("email : less than 255 characters")
    .bail()
    .isEmail()
    .withMessage("email : not a valid email address");

const validatePassword = () =>
  body("password")
    .isLength({ max: 255 })
    .withMessage("password : less than 255 characters")
    .bail()
    .custom((value: string) => v.isPasswordStrong(value))
    .withMessage(() => v.getWeakPasswordMsg())
    .custom((value: string, { req }) => value == req.body.confirmPassword)
    .withMessage(
      "confirm-password : password and confirm-password do not matches "
    );

const validateFirstName = () =>
  body("firstname")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({
      min: appUserProperties.defaultMinLength,
      max: appUserProperties.defaultMaxLength,
    })
    .withMessage(
      `Firstname must be between ${appUserProperties.defaultMinLength} and  ${appUserProperties.defaultMaxLength}`
    );
const validateLastName = () =>
  body("lastname")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({
      min: appUserProperties.defaultMinLength,
      max: appUserProperties.defaultMaxLength,
    })
    .withMessage(
      `Lastname must be between ${appUserProperties.defaultMinLength} and  ${appUserProperties.defaultMaxLength}`
    );
export default { validationRules };
