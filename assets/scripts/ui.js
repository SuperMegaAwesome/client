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
  $('.add-to-cart').text('')
  $('.cart-btn').addClass('hide')
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

const checkoutSuccess = function (data) {
  store.cart = data.cart
  console.log(data.cart)
  console.log('checkout success')
  $('.cart-button').removeClass('hide')
  $('#checkout').hide()
}

const checkoutFailure = function (error) {
  console.error(error)
}

const updateOrderSuccess = function () {
  // put in user message indicating success
}

const updateOrderFailure = function (error) {
  console.error(error)
}

const cancelOrderSuccess = function () {
  store.cart = null
  const resetVal = 0.00
  document.getElementById('cart-total').value = resetVal.toFixed(2)
  $('.cart-item').remove()
  // message indicating success
  $('.cart-button').addClass('hide')
  $('#checkout').show()
}

const cancelOrderFailure = function (error) {
  console.error(error)
}

const getHistorySuccess = function (data) {
  const historyHTML = historyTemplate({ carts: data.carts })
  $('#order-history').html(historyHTML)
  console.log(historyHTML)
  console.log(data)
  console.log(data.carts)
  console.log(data.carts[0].pastOrder[0])
}

const getHistoryFailure = function () {

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
  getHistorySuccess
}
