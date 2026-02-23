function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

function isValidName(name) {
  return typeof name === 'string' && name.length >= 3
}

function isValidId(id, users) {
  const isUnique = !users.some(user => user.id ===id)
  return isUnique
}

function validateUser(user, users) {
  const { name, email, id } = user

  if (!isValidName(name)) {
    return {
      isValid: false,
      error: "Name must be at least 3 characters"
    }
  }

  if (!isValidEmail(email)) {
    return { 
      isValid: false, 
      error: "Email is not valid"
    }
  }

  if (!isValidId(id, users)) {
    return {
      isValid: false,
      error: "ID must be unique"
    }
  }

  return { isValid: true }
}

module.exports = {
  isValidEmail,
  isValidName,
  isValidId,
  validateUser
}