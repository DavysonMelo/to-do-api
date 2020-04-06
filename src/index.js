const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()

app.use(cors())
mongoose.connect('mongodb+srv://dave:88169976@cluster0-xoc3j.gcp.mongodb.net/mytodo?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json())
app.use(routes)

app.listen(3333)
