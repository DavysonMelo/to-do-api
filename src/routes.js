const { Router } = require('express')
const authMiddleware = require('./middlewares/auth')
const UserController = require('./controllers/UserController')
const ToDoController = require('./controllers/ToDoController')

const routes = Router()

routes.post('/user', UserController.store)
routes.post('/sessions', UserController.index)

routes.use(authMiddleware)
routes.post('/todo', ToDoController.store)
routes.get('/todo', ToDoController.index)
routes.delete('/todo/:id', ToDoController.delete)

module.exports = routes
