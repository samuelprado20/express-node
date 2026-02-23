const express = require('express')
require('dotenv').config()

const fs = require('fs')
const path = require('path')
const { validateUser } = require('./utils/validation.js')

const bodyParser = require('body-parser')
const usersFilePath = path.join(__dirname, 'users.json')

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

app.get('/users', (req, res) => {
  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if(err) { 
      return res.status(500).json({ error: 'Error fetching data'})
    }
    const users = JSON.parse(data)
    res.json(users)
  })
})

app.post('/users', (req, res) => {
  const userData = req.body

  if (!userData.name || !userData.email) {
    return res.status(400).json({ error: 'Name and e-mail are required'})
  }
  
  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching data'})
    }

    const users = JSON.parse(data)
    const validation = validateUser(userData, users)
    
    if(!validation.isValid) {
      return res.status(400).json({ error: validation.error })
    }

    const newUser = { 
      id: crypto.randomUUID(),
      name: userData.name,
      email: userData.email
    }

    users.push(newUser)

    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error saving the user'})
      }
      res.status(201).json(newUser)
    })
  })

})

app.put('/users/:id', (req, res) => {
  const userId = req.params.id

  const updatedUser = req.body

  if (!updatedUser.name && !updatedUser.email){
    return res.status(400).json({ error: 'No data provided'})
  }

  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching Data'})
    }

    let users = JSON.parse(data)

    users = users.map(user => (user.id === userId ? {...user, ...updatedUser} : user))

    fs.writeFile(usersFilePath,JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error while saving data'})
      }
      res.json(updatedUser)
    })
  })
})

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id

  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching Data'})
    }

    let users = JSON.parse(data)

    const userIndex = users.findIndex(user => user.id === userId)
    
    if (userIndex >= 0) {
      users.splice(userIndex, 1)
      fs.writeFile(usersFilePath,JSON.stringify(users, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ error: 'Error while saving data'})
        }
      })
      return res.status(204).send()
    } else {
      return res.status(404).json({ error: "User not found"})
    }
  })
})

app.listen(PORT, () => (
  console.log(`Server running on http://localhost:${PORT}`)
))
