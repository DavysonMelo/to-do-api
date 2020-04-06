const ToDoList = require('../models/ToDoList')

module.exports = {

  async index (req, res) {
    const user = req.headers.userid

    const toDoList = await ToDoList.find({ user })

    res.json(toDoList)
  },

  async store (req, res) {
    const { title } = req.body
    const user = req.headers.userid

    const toDo = await ToDoList.create({
      title,
      user
    })
    return res.json({ toDo })
  },

  async delete (req, res) {
    const { id } = req.params

    await ToDoList.findById(id).remove()

    return res.json({ message: 'toDo deleted' })
  }
}
