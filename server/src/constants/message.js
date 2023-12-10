export const VALIDATION_MESSAGES = {
  ERROR: 'Validation error',
}

export const USERNAME_MESSAGES = {
  IS_REQUIRED: 'Username is required',
  MUST_BE_A_STRING: 'Username must be a string',
  LENGTH: 'Username must between 3 and 20 characters',
}

export const EMAIL_MESSAGES = {
  IS_REQUIRED: 'Email is required',
  MUST_BE_A_STRING: 'Email must be a string',
  INVALID_EMAIL: 'Invalid email',
}

export const PASSWORD_MESSAGES = {
  IS_REQUIRED: 'Password is required',
  MUST_BE_A_STRING: 'Password must be a string',
  LENGTH: 'Password must between 6 and 86 characters',
  IS_STRONG: 'Password must contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol',
}

export const CONFIRM_PASSWORD_MESSAGES = {
  IS_REQUIRED: 'Confirm password is required',
  MUST_BE_A_STRING: 'Confirm password must be a string',
  LENGTH: 'Confirm password must between 6 and 86 characters',
  IS_STRONG: 'Confirm password must contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol',
  DOES_NOT_MATCH: 'Confirm password does not match',
}

export const SIGNUP_MESSAGES = {
  SUCCESS: 'Signup successfully',
}
