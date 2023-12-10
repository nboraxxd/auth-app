import { Router } from 'express'

import { signupValidator } from '@/middlewares/auth.middlewares'
import { signUpController } from '@/controllers/auth.controller'

const authRouter = Router()

/**
 * @swagger
 * /users/signup:
 *  post:
 *   tags:
 *    - users
 *   summary: Signup new user
 *   description: ''
 *   operationId: signup
 *   requestBody:
 *    description: email and password to create new user
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
