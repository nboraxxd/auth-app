import { Router } from 'express'

import { googleOAuthValidator, signinValidator, signupValidator } from '@/middlewares/auth.middlewares'
import { googleOAuthController, signInController, signUpController } from '@/controllers/auth.controller'

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

export default authRouter
