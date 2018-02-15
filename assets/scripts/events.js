'use strict'

const getFormFields = require('../../lib/get-form-fields')

const api = require('./api')
const ui = require('./ui')
const cartArray = []

const onSignUp = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
    .then(ui.signUpSuccess)
    // want to automatically sign in
    .then(() => api.signIn(data))
    .then(ui.signInSuccess)
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

const addToCart = function (event) {
  const name = $(event.target).parents('.product').find('.prod-name').text()
  const price = $(event.target).parents('.product').find('.product-price').text()

  console.log(name)
  console.log(price)

  const tableVal = `<tr><td class="name">${name}</td><td class="quantity"><input class="cart-quant" value=1></td><td class="price">${price}</td></tr>`

  const product = {
    name: name,
    quantity: 1,
    price: price
  }
  cartArray.push(product)
  $('.fill-this').append(tableVal)
}

const onCheckout = () => {
  const price = cartArray[0].price.replace('$', '')
  const data = {
    cart: {
      pastOrder: cartArray,
      orderTotal: parseFloat(price) * cartArray[0].quantity * 100 // total in cents
    }
  }
  console.log(data)
  api.checkout(data)
    .then(console.log)
}

const addHandlers = () => {
  $('.sign-up').on('submit', onSignUp)
  $('.sign-in').on('submit', onSignIn)
  $('.sign-out').on('submit', onSignOut)
  $('.change-password').on('submit', onChangePassword)
  $('#login-button').on('click', function () { $('#sign-in-modal').modal('show') })
  $('.cart-btn').on('click', addToCart)
  $('#checkout').on('click', onCheckout)
}

module.exports = {
  addHandlers
}
