'use strict'

const store = require('./store')
const historyTemplate = require('./templates/order-history.handlebars')

const signUpSuccess = function (data) {
  $('#sign-up-error').text('')
  $('form').trigger('reset')
  $('#message').text('Successfully Signed Up!').css('color', 'green')
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
  $('#message').text('You have successfully signed in!').css('color', 'green')
  $('.cart-btn').removeClass('hide')
  $('#login-button').html('Account')
  $('#logInLabel').html('Account')
}

const signOutSuccess = () => {
  store.user = null
  $('#content').hide()
  $('#welcome-page').show()
  $('#sign-in-modal').modal('hide')
  // $('.profile').hide()
  $('#checkout-button').hide()
  $('.sign-in-warn').show()
  $('.after-in').hide()
  $('.after-out').show()
  $('#message').text('Successfully signed out!').css('color', 'green')
  $('.add-to-cart').text('')
  $('.cart-btn').addClass('hide')
  $('#login-button').html('Log In')
  $('#logInLabel').html('Log In')
}

const changePasswordSuccess = function () {
  $('form').trigger('reset')
  $('#sign-in-modal').modal('hide')
  $('#message').text('Successfully changed password!').css('color', 'green')
}

const signInFailure = function () {
  $('#sign-in-error').text('Incorrect Email and/or Password').css('color', 'red')
  $('#message').html('')
}
const signUpFailure = function () {
  $('#sign-up-error').text('Error signing up').css('color', 'red')
  $('#message').html('')
}
const changePasswordFailure = function () {
  $('#password-error').text('Error changing password').css('color', 'red')
  $('form').trigger('reset')
  $('#message').html('')
}

const signOutFailure = function () {
  $('#message').text('Error signing out').css('color', 'red')
}

const checkoutSuccess = function (data) {
  store.cart = data.cart
  $('.cart-button').removeClass('hide')
  $('#checkout').addClass('hide')
  $('#cart-message').text('Select "Cancel" or "Purchase" to proceed').css('color', 'green')
}

const checkoutFailure = function () {
  $('#cart-message').text('Error checking out').css('color', 'red')
}

const updateOrderSuccess = function () {
  $('#cart-message').text('Purchase successful!').css('color', 'green')
  $('#cart-total').trigger('reset')
  $('#checkout').addClass('hide')
  $('.cart-btn').removeClass('hide')
  $('.add-to-cart').text('')
}

const updateOrderFailure = function () {
  $('#cart-message').text('Error updating order').css('color', 'red')
}

const cancelOrderSuccess = function () {
  store.cart = null
  const resetVal = 0.00
  document.getElementById('cart-total').value = resetVal.toFixed(2)
  $('.cart-item').remove()
  // message indicating success
  $('.cart-button').addClass('hide')
  $('#cart-message').text('Order canceled').css('color', 'green')
  $('#cart-total').trigger('reset')
  $('.cart-btn').removeClass('hide')
  $('.add-to-cart').text('')
}

const cancelOrderFailure = function () {
  $('#cart-message').text('Error canceling order').css('color', 'red')
}

const getHistorySuccess = function (data) {
  const historyHTML = historyTemplate({ carts: data.carts })
  $('#order-history').html(historyHTML)
}

const getHistoryFailure = function () {
  $('#history-message').text('Error retrieving order history').css('color', 'red')
}

module.exports = {
  signUpSuccess,
  signInSuccess,
  signOutSuccess,
  changePasswordSuccess,
  signInFailure,
  signUpFailure,
  changePasswordFailure,
  signOutFailure,
  checkoutSuccess,
  checkoutFailure,
  updateOrderSuccess,
  updateOrderFailure,
  cancelOrderSuccess,
  cancelOrderFailure,
  getHistorySuccess,
  getHistoryFailure
}
