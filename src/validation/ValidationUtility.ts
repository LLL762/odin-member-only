import validator from "validator";

const blackListChars: string[] = ["$", "#", "@", "%", "{", "}"];
const weakPasswordMsg: string =
  "password must be at least 10 characters, at least 1 lowercase, at least 1 uppercase, at least 1 digits, and at least 1 special character";
const containsBlackListCharsMsg: string = `characters ${blackListChars} are forbidden`;
const invalidEmailMsg: string = "email : invalid email address";

const isPasswordStrong = (password: string): boolean =>
  validator.isStrongPassword(password, {
    minLength: 10,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });

const doesNotContainBlackListChars = (value: string): boolean =>
  !blackListChars.some((char) => value.includes(char));

const getWeakPasswordMsg = () => weakPasswordMsg;
const getBlackListChars = () => [...blackListChars];
const getContainsBlackListCharsMsg = () => containsBlackListCharsMsg;
const getInvalidEmailMsg = () => invalidEmailMsg;

const createMaxLengthMsg = (fieldName: string, maxLength: number) =>
  `${fieldName} : max ${maxLength} characters`;

const createMinLengthMsg = (fieldName: string, minLength: number) =>
  `${fieldName} : min ${minLength} characters`;

const createRequiredMsg = (fieldName: string) =>
  `${fieldName} : ${fieldName} is required `;

const createTooManyElemMsg = (fieldName: string, maxLength: number) =>
  `${fieldName} : ${fieldName} must have less than ${maxLength} elements`;

const createMaxMsg = (fieldName: string, max: number) =>
  `${fieldName} : must be less than ${max}`;

const createMinMsg = (fieldName: string, min: number) =>
  `${fieldName} : must be greater than ${min}`;

export default {
  isPasswordStrong,
  getWeakPasswordMsg,
  getBlackListChars,
  doesNotContainBlackListChars,
  getContainsBlackListCharsMsg,
  createMaxLengthMsg,
  createMinLengthMsg,
  createRequiredMsg,
  getInvalidEmailMsg,
  createTooManyElemMsg,
  createMaxMsg,
  createMinMsg,
};
