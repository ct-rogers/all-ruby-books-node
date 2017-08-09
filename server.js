const express = require('express')
const mustacheExpress = require('mustache-express')
const pgPromise = require('pg-promise')()
const bodyParser = require('body-parser')

const app = express()
const database = pgPromise({database: 'all-ruby-books-node'})

// Use the middleware (i.e plugin) for static files
// and tell express they are in the 'public' folder
app.use(express.static('public'))

app.engine('mustache', mustacheExpress())
app.set('views', './templates')
app.set('view engine', 'mustache')

app.use(bodyParser.urlencoded({extended: false}))

app.get('/search', (request, response) => {
  const title = request.query.title
  
  // Find all the books that have `title` in their title
  // SELECT * FROM "books" WHERE "title" LIKE '%Rails%'
  database.any('SELECT * FROM "books" where "title" LIKE $(pattern)',
                { pattern: `%${title}%` })
          .then((books) => {
            response.render('search', { books: books })
          })
          .catch((error) => {
            console.log('error', error)
            /* Log this error to another database */
            /* Third party apss to track errors */
            response.render('error')
          })
})

app.get('/', (request, response) => {
  database.any('SELECT * FROM "books"')
    .then((books) => {
      response.render('home', { books: books })
    })
    .catch(error => {
      console.log('error', error)
      /* Log this error to another database */
      /* Third party apss to track errors */
      response.render('error')
    })
})

app.listen(3000, () => {
  console.log('Awake on port 3000')
})



















//