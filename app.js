const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send(`
      <h1> Express course v3</h1>
      <p>Node app running on port ${PORT}.
      This is <strong>AMAZINGGGGGG</strong>
      </P>
    `)
})

app.get('/users/:id', (req, res) => {
  const userId = req.params.id
  res.send(`Show user info with id: ${userId}`)
})

app.get('/search', (req, res) => {
  const terms = req.query.term || 'Not specified'
  const category = req.query.category || 'All'

  res.send(`
    <h2>Search results</h2>
    <p>Term: ${terms}</p>
    <p>Category: ${category}</p>
  `)
})

app.post('/form', (req, res) => {
  const name = req.body.name || 'Anonymous'
  const email = req.body.email || 'Email not provided'

  res.json({
    message: 'Data received',
    data: {
      name,
      email
    }
  })
})

app.post('/api/data', (req, res) => {
  const data = req.body

  if(!data || Object.keys(data).length == 0) {
    return res.status(400).json({error: 'No data received'})
  }

  res.status(201).json({
    message: 'JSON received',
    data
  })
})

app.listen(PORT, () => (
  console.log(`Server running on http://localhost:${PORT}`)
))
