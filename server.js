const express = require('express')
const mustacheExpress = require('mustache-express')
const pgPromise = require('pg-promise')()

const app = express()
const database = pgPromise({database: 'all-ruby-books-node'})

// Use the middleware (i.e plugin) for static files
// and tell express they are in the 'public' folder
app.use(express.static('public'))

app.engine('mustache', mustacheExpress())
app.set('views', './templates')
app.set('view engine', 'mustache')

app.get('/', (request, response) => {
  response.render('home')
})

app.listen(3000, () => {
  console.log('Awake on port 3000')
})



















//