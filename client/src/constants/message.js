export const VALIDATION_MESSAGES = {
  ERROR: 'Validation error',
}

export const USERNAME_MESSAGES = {
  IS_REQUIRED: 'Username is required',
  MUST_BE_A_STRING: 'Username must be a string',
  NOT_CONTAIN_SPACE: 'Username must not contain space',
  NOT_CONTAIN_SPECIAL_CHARACTER: 'Username must not contain special character',
  LENGTH: 'Username must between 3 and 128 characters',
}

export const EMAIL_MESSAGES = {
  IS_REQUIRED: 'Email is required',
  MUST_BE_A_STRING: 'Email must be a string',
  INVALID: 'Invalid email',
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
  DOES_NOT_MATCH: 'Confirm password does not match password',
}

export const SIGNUP_MESSAGES = {
  SUCCESS: 'Signup successfully',
}

export const IMAGE_MESSAGES = {
  MUST_BE_AN_IMAGE: 'File must be an image',
  MAX_SIZE: 'Image size must be less than 2MB',
  UPLOAD_FAILED: 'Upload image failed',
}

export const TOKEN_MESSAGES = {
  EXPIRED: 'Jwt expired',
}
