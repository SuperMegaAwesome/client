'use strict'

// const store = require('./store')

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
  $('#sign-in-modal').modal('hide')
  // console.log('Signed in as: ' + app.user.email)
  // console.log(app.user)
  $('form').trigger('reset')
  // $('#order-history').html('')
  $('#checkout-button').show()
  $('.sign-in-warn').hide()
  $('.after-in').show()
  $('.after-out').hide()
}

module.exports = {
  signUpSuccess,
  failure,
  signInSuccess
}
