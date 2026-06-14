const { Router } = require('express')
const { register, login } = require('../controllers/authController')
const authenticateToken = require('../middlewares/auth')

const router = Router()

router.post('/register', register)
router.post('/login', login)

router.get('/protected-route', authenticateToken, async (req, res) => {
  console.log(`This is the user role: ${req.user.role}`)

  res.send('This is a protected route')
})

module.exports = router