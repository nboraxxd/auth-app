import { CONFIRM_PASSWORD_MESSAGES, PASSWORD_MESSAGES, USERNAME_MESSAGES } from '@/constants/message'
import * as z from 'zod'

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, USERNAME_MESSAGES.LENGTH)
      .max(20, USERNAME_MESSAGES.LENGTH)
      .regex(new RegExp('^\\S*$'), USERNAME_MESSAGES.NOT_CONTAIN_SPACE)
      .regex(new RegExp('^[a-zA-Z0-9_]*$'), USERNAME_MESSAGES.NOT_CONTAIN_SPECIAL_CHARACTER),

    email: z.string().email(USERNAME_MESSAGES.INVALID),

    password: z
      .string()
      .regex(new RegExp('^.{6,86}$'), PASSWORD_MESSAGES.LENGTH)
      .regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'), PASSWORD_MESSAGES.IS_STRONG),

    confirm_password: z
      .string()
      .regex(new RegExp('^.{6,86}$'), CONFIRM_PASSWORD_MESSAGES.LENGTH)
      .regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'), CONFIRM_PASSWORD_MESSAGES.IS_STRONG),
  })
  .refine(
    (values) => {
      return values.password === values.confirm_password
    },
    {
      message: CONFIRM_PASSWORD_MESSAGES.DOES_NOT_MATCH,
      path: ['confirm_password'],
    }
  )

export const signInSchema = z.object({
  email: z.string().email(USERNAME_MESSAGES.INVALID),

  password: z
    .string()
    .regex(new RegExp('^.{6,86}$'), PASSWORD_MESSAGES.LENGTH)
    .regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'), PASSWORD_MESSAGES.IS_STRONG),
})
