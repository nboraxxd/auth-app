export const VALIDATION_MESSAGES = {
  ERROR: 'Validation error',
}

export const NAME_MESSAGES = {
  IS_REQUIRED: 'Name is required',
  MUST_BE_A_STRING: 'Name must be a string',
}

export const USERNAME_MESSAGES = {
  IS_REQUIRED: 'Username is required',
  MUST_BE_A_STRING: 'Username must be a string',
  LENGTH: 'Username must between 3 and 128 characters',
  MUST_NOT_CONTAIN_SPACE: 'Username must not contain space',
  MUST_NOT_CONTAIN_SPECIAL_CHARACTERS: 'Username must not contain special characters',
}

export const EMAIL_MESSAGES = {
  IS_REQUIRED: 'Email is required',
  MUST_BE_A_STRING: 'Email must be a string',
  INVALID: 'Invalid email',
  NOT_FOUND: 'Email not found',
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
  DOES_NOT_MATCH: 'Confirm password does not match with password',
}

export const SIGNUP_MESSAGES = {
  SUCCESS: 'Signup successfully',
}

export const USER_MESSAGES = {
  NOT_FOUND: 'User not found',
  ID_IS_REQUIRED: 'User id is required',
  ID_INVALID: 'User id is invalid',
}

export const SIGNIN_MESSAGES = {
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  SUCCESS: 'Signin successfully',
}

export const DATE_MESSAGES = {
  IS_REQUIRED: 'Date is required',
  INVALID: 'Invalid date',
}

export const ACCESS_TOKEN_MESSAGES = {
  IS_REQUIRED: 'Access token is required',
  INVALID: 'Access token is invalid',
}

export const REFRESH_TOKEN_MESSAGES = {
  IS_REQUIRED: 'Refresh token is required',
  INVALID: 'Refresh token is invalid',
  NOT_FOUND: 'Refresh token not found',
  SUCCESS: 'Refresh token successfully',
}

export const PHOTO_URL_MESSAGES = {
  IS_REQUIRED: 'Photo url is required',
  INVALID: 'Photo url is invalid',
}

export const GOOGLE_OAUTH_MESSAGES = {
  SIGNIN_SUCCESSFULLY: 'Signin with google successfully',
  SIGNUP_SUCCESSFULLY: 'Signup with google successfully',
}

export const ME_MESSAGES = {
  GET_SUCCESS: 'Get profile successfully',
  UPDATE_SUCCESS: 'Update profile successfully',
  DELETE_SUCCESS: 'Delete account successfully',
}

export const SIGNOUT_MESSAGES = {
  SUCCESS: 'Signout successfully',
}
