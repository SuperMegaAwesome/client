'use strict'

const store = require('./store')

const signUpSuccess = function (data) {
  $('#sign-up-error').text('')
  $('form').trigger('reset')
  console.log('sign up worked!')
  // add message div to HTML
  $('#message').text('Successfully Signed Up!').css('color', 'green')
}

const signInSuccess = (data) => {
  console.log('signed in!')
  store.user = data.user
  $('#sign-in-modal').modal('hide')
  $('form').trigger('reset')
  // $('#order-history').html('')
  $('#checkout-button').show()
  $('.sign-in-warn').hide()
  $('.after-in').show()
  $('.after-out').hide()
  $('#message').text('You have successfully signed in!').css('color', 'green')
}

const signOutSuccess = () => {
  store.user = null
  console.log('Signed out')
  $('#content').hide()
  $('#welcome-page').show()
  $('#sign-in-modal').modal('hide')
  // $('.profile').hide()
  $('#checkout-button').hide()
  $('.sign-in-warn').show()
  $('.after-in').hide()
  $('.after-out').show()
  $('#message').text('Successfully signed out!').css('color', 'green')
}

const changePasswordSuccess = function () {
  console.log('Password changed')
  $('form').trigger('reset')
  $('#sign-in-modal').modal('hide')
  $('#message').text('Successfully changed password!').css('color', 'green')
}

const signInFailure = function (error) {
  console.error(error)
  $('#sign-in-error').text('Incorrect Email and/or Password').css('color', 'red')
  $('#message').html('')
}
const signUpFailure = function (error) {
  console.error(error)
  $('#sign-up-error').text('Error signing up').css('color', 'red')
  $('#message').html('')
}
const changePasswordFailure = function (error) {
  console.error(error)
  $('#password-error').text('Error changing password').css('color', 'red')
  $('form').trigger('reset')
  $('#message').html('')
}

const signOutFailure = function (error) {
  console.error(error)
  $('#message').text('Error signing out').css('color', 'red')
}

module.exports = {
  signUpSuccess,
  signInSuccess,
  signOutSuccess,
  changePasswordSuccess,
  signInFailure,
  signUpFailure,
  changePasswordFailure,
  signOutFailure
}
