import { Router } from 'express'

import { signupValidator } from '@/middlewares/auth.middlewares'
import { signUpController } from '@/controllers/auth.controller'

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

export default authRouter
