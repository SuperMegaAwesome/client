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

module.exports = {
  signUpSuccess,
  failure
}
