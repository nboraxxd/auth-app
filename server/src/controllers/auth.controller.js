import bcryptjs from 'bcryptjs'
import User from '@/models/auth.model'

export async function authController(req, res) {
  const { username, email, password } = req.body

  const hashedPassword = bcryptjs.hashSync(password, 10)

  const newUser = new User({ username, email, password: hashedPassword })

  try {
    const result = await newUser.save()

    return res.status(201).json({ message: 'Signup successfully', result })
  } catch (error) {
    return res.status(422).json({ message: error.message })
  }
}
