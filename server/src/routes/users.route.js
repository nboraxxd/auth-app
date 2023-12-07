import { usersController } from '@/controllers/users.controller'
import { Router } from 'express'

const usersRouter = Router()

usersRouter.get('/', usersController)

export default usersRouter
