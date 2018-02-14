'use strict'

const store = require('./store')

const signUpSuccess = function (data) {
  $('#sign-up-error').text('')
  console.log('sign up worked!')
  // add message div to HTML
  // $('#message').text('Successfully Signed Up!').css('color', 'green')
}

const failure = (error) => {
  console.error(error)
}

const signInSuccess = (data) => {
  store.user = data.user
  $('#sign-in-modal').modal('hide')
  $('form').trigger('reset')
  // $('#order-history').html('')
  $('#checkout-button').show()
  $('.sign-in-warn').hide()
  $('.after-in').show()
  $('.after-out').hide()
}

const signOutSuccess = () => {
  store.user = null
  // console.log('Signed out')
  $('#content').hide()
  $('header').hide()
  $('#welcome-page').show()
  $('#sign-in-modal').modal('hide')
  $('.profile').hide()
  $('#checkout-button').hide()
  $('.sign-in-warn').show()
  $('.after-in').hide()
  $('.after-out').show()
}

const changePasswordSuccess = function () {
  console.log('Password changed')
  $('form').trigger('reset')
}

module.exports = {
  signUpSuccess,
  failure,
  signInSuccess,
  signOutSuccess,
  changePasswordSuccess
}
