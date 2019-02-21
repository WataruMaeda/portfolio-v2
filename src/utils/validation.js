// MARK: - Validations

const email = (value) => {
  const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i; // eslint-disable-line
  return regex.test(value) ? null : 'Invalid email'
}

const notEmpty = (value) => {
  return value && value.length > 0 ? null : 'The field is mandatory'
}

const phone = (value) => {
  if (!value || (value && value.length === 0)) return null
  const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
  return regex.test(value) ? null : 'Invalid number'
}

// MARK: - Swicher

const isValid = (name, value) => {
  switch (name) {
    case 'email':
      return email(value)
    case 'name':
      return notEmpty(value)
    case 'phone':
      return phone(value)
    default:
      break
  }
}

// MARK: - Accessor

export const vali = state => {  // eslint-disable-line
  let errors = {}
  let isError = false
  Object.keys(state).forEach(key => { // eslint-disable-line
    const err = isValid(key, state[key])
    if (err) {
      isError = true
      errors[key] = err
    }
  })
  return { isError, errors }
}