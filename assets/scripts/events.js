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

const onSignIn = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .done(ui.signInSuccess)
    .fail(ui.failure)
}

const onSignOut = (event) => {
  event.preventDefault()
  api.signOut()
    .done(ui.signOutSuccess)
    .fail(ui.failure)
}

const onChangePassword = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .done(ui.changePasswordSuccess)
    .fail(ui.failure)
}

const addHandlers = () => {
  $('.sign-up').on('submit', onSignUp)
  $('.sign-in').on('submit', onSignIn)
  $('.sign-out').on('submit', onSignOut)
  $('.change-password').on('submit', onChangePassword)
  $('#login-button').on('click', function () { $('#sign-in-modal').modal('show') })
}

module.exports = {
  addHandlers
}
