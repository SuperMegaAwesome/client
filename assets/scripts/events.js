'use strict'

const getFormFields = require('../../lib/get-form-fields')

const api = require('./api')
const ui = require('./ui')

const onSignUp = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(ui.signUpSuccess)
    // want to automatically sign in
    // .then(() => api.signIn(data))
    // .then(ui.signInSuccess)
    .catch(ui.failure)
}

const addHandlers = () => {
  $('.sign-up').on('submit', onSignUp)
  $('#login-button').on('click', function () { $('#sign-in-modal').modal('show') })
}

module.exports = {
  addHandlers
}
