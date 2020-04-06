const User = require('../models/User')
const hashPass = require('./utils/hashPass')
const bcrypt = require('bcrypt')
const generateToken = require('./utils/generateToken')

module.exports = {

  async index (req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user) { return res.status(400).send({ error: 'User not found' }) }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(400).send({ error: 'Invalid password' })
    }

    user.password = undefined

    const id = user.id

    return res.json({
      user,
      token: generateToken({ id })
    })
  },

  async store (req, res) {
    const { name, email, password } = req.body

    let user = await User.findOne({ email })

    if (!user) {
      user = await User.create({
        name,
        email,
        password: await hashPass(password)
      })
    } else {
      return res.status(400).send({ error: 'User already exists.' })
    }

    user.password = undefined

    const id = user.id

    return res.json({
      user,
      token: generateToken({ id })
    })
  }
}
