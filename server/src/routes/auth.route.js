import { Router } from 'express'

import {
  accessTokenValidator,
  googleOAuthValidator,
  refreshTokenValidator,
  signinValidator,
  signupValidator,
  updateMeValidator,
} from '@/middlewares/auth.middlewares'
import { filterMiddleware } from '@/middlewares/common.middlewares'
import {
  deleteMeController,
  getMeController,
  googleOAuthController,
  refreshTokenController,
  signInController,
  signOutController,
  signUpController,
  updateMeController,
} from '@/controllers/auth.controller'

const authRouter = Router()

/**
 * @swagger
 * /auth/sign-up:
 *  post:
 *   tags:
 *    - auth
 *   summary: Signup new user
 *   description: 'Create a new user having username, email and password.'
 *   operationId: sign-up
 *   requestBody:
 *    description: created user object
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/SignupReqBody'
 *   responses:
 *    '200':
 *     description: Signup successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *          example: Signup successfully
 *         result:
 *          $ref: '#/components/schemas/SuccessAuthentication'
 *    '422':
 *     description: Invalid value or missing field
 */
authRouter.post('/sign-up', signupValidator, signUpController)

/**
 * @swagger
 * /auth/sign-in:
 *  post:
 *   tags:
 *    - auth
 *   summary: Signin user
 *   description: 'Signin user having email and password.'
 *   operationId: sign-in
 *   requestBody:
 *    description: signin user object
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/SigninReqBody'
 *   responses:
 *    '200':
 *     description: Signin successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *          example: Signin successfully
 *         result:
 *          $ref: '#/components/schemas/SuccessAuthentication'
 *    '422':
 *     description: Invalid value or missing field
 *    '404':
 *     description: Not found
 */
authRouter.post('/sign-in', signinValidator, signInController)

/**
 * @swagger
 * /auth/google:
 *  post:
 *   tags:
 *    - auth
 *   summary: Authenticate with Google
 *   description: 'Authenticate with Google method of Firebase.'
 *   operationId: google
 *   requestBody:
 *    description: user object
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/GoogleOAuthReqBody'
 *   responses:
 *    '200':
 *     description: Authenticate with Google successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *          example: Authenticate with Google successfully
 *         result:
 *          $ref: '#/components/schemas/SuccessAuthentication'
 *    '422':
 *     description: Invalid value or missing field
 */
authRouter.post('/google', googleOAuthValidator, googleOAuthController)

/**
 * @swagger
 * /auth/me:
 *  get:
 *   tags:
 *    - auth
 *   summary: Get my profile
 *   description: 'Get my profile.'
 *   operationId: get-me
 *   responses:
 *    '200':
 *     description: Get my profile successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *          example: Get my profile successfully
 *         result:
 *          $ref: '#/components/schemas/SuccessAuthentication'
 *    '422':
 *     description: Invalid value or missing field
 *    '404':
 *     description: Not found
 */
authRouter.get('/me', accessTokenValidator, getMeController)

/**
 * @swagger
 * /auth/me:
 *  patch:
 *   tags:
 *    - auth
 *   summary: Update my profile
 *   description: 'Update my profile with username, password, confirm_password and photo_url.'
 *   operationId: update-me
 *   requestBody:
 *    description: User object without email
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/UpdateMeBody'
 *   responses:
 *    '200':
 *     description: Update my profile successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *          example: Update my profile successfully
 *         result:
 *          $ref: '#/components/schemas/SuccessAuthentication'
 *    '422':
 *     description: Invalid value or missing field
 *    '401':
 *     description: Invalid or expired access token
 *    '404':
 *     description: Not found
 */
authRouter.patch(
  '/me',
  accessTokenValidator,
  updateMeValidator,
  filterMiddleware(['username', 'password', 'confirm_password', 'photo_url']),
  updateMeController
)

/**
 * @swagger
 * /auth/refresh-token:
 *  post:
 *   tags:
 *    - auth
 *   summary: Refresh token
 *   description: 'Refresh token when access token is expired.'
 *   operationId: refresh-token
 *   responses:
 *    '200':
 *     description: Refresh token successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *          example: Refresh token successfully
 *    '401':
 *     description: Invalid or expired token
 *    '404':
 *     description: Not found
 */
authRouter.post('/refresh-token', refreshTokenValidator, refreshTokenController)

/**
 * @swagger
 * /auth/sign-out:
 *  post:
 *   tags:
 *    - auth
 *   summary: Sign out
 *   description: 'Sign out user.'
 *   operationId: sign-out
 *   responses:
 *    '200':
 *     description: Signout successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *          example: Signout successfully
 *    '401':
 *     description: Invalid or expired token
 *    '404':
 *     description: Not found
 */
authRouter.post('/sign-out', accessTokenValidator, refreshTokenValidator, signOutController)

/**
 * @swagger
 * /auth/me:
 *  delete:
 *   tags:
 *    - auth
 *   summary: Delete account
 *   description: 'Delete account with access token and refresh token.'
 *   operationId: delete-me
 *   responses:
 *    '200':
 *     description: Delete account successfully
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         message:
 *          type: string
 *          example: Delete account successfully
 *    '401':
 *     description: Invalid or expired token
 *    '404':
 *     description: Not found
 */
authRouter.delete('/me', accessTokenValidator, refreshTokenValidator, deleteMeController)

export default authRouter
