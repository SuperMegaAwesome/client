'use strict'

const getFormFields = require('../../lib/get-form-fields')

const api = require('./api')
const ui = require('./ui')
const cartArray = []
let total = 0

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

  const tableVal = `<tr><td>${name}</td><td><input type=number class="cart-quant" min=1 value=1></td><td>${price}</td><td><button type="button" class="update-item-btn">Update</span></td><td><button type="button" class="delete-btn">Remove</span></td></tr>`

  const product = {
    name: name,
    quantity: 1,
    price: price
  }
  cartArray.push(product)

  const itemPrice = price.replace('$', '')
  document.getElementById('cart-total').value = itemPrice

  $('.fill-this').append(tableVal)
  $('.cart-btn').addClass('hide')
  $('.add-to-cart').text('Added to cart!').css('green')
}

const onCheckout = () => {
  const price = cartArray[0].price.replace('$', '')
  const data = {
    cart: {
      pastOrder: cartArray,
      orderTotal: parseFloat(price) * cartArray[0].quantity * 100 // total in cents
    }
  }

  api.checkout(data)
    .then(console.log)
}

const onUpdateItem = (event) => {
  const qty = $('.cart-quant').val()
  const price = cartArray[0].price.replace('$', '')
  total = (price * qty).toFixed(2)

  document.getElementById('cart-total').value = total
}

const onRemoveItem = (event) => {
  console.log(event.target)
  const data = $(event.target)
  console.log(data.parents('tr'))
  data.parents('tr').remove()
  const resetVal = 0.00
  document.getElementById('cart-total').value = resetVal.toFixed(2)
}

const addHandlers = () => {
  $('.sign-up').on('submit', onSignUp)
  $('.sign-in').on('submit', onSignIn)
  $('.sign-out').on('submit', onSignOut)
  $('.change-password').on('submit', onChangePassword)
  $('#login-button').on('click', function () { $('#sign-in-modal').modal('show') })
  $('.cart-btn').on('click', addToCart)
  $('#checkout').on('click', onCheckout)
  $('#checkout').on('click', function () { $('.cart-button').removeClass('hide') })
  $('#checkout').on('click', function () { $('#checkout').hide() })
  $('body').on('click', '.update-item-btn', onUpdateItem)
  $('body').on('click', '.delete-btn', onRemoveItem)
}

module.exports = {
  addHandlers
}
