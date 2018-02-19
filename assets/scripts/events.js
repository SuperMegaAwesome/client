'use strict'

const getFormFields = require('../../lib/get-form-fields')

const api = require('./api')
const ui = require('./ui')
const store = require('./store')
const config = require('./config')

// --------Global Variables for the current cart and current cart total------------
const cartArray = []
let total = 0

// -----------------------!!!!!STRIPE MAGIC BELOW!!!!!--------------------------------
// StripeCheckout is imported via script tag in html. It's not an error
const handler = StripeCheckout.configure({
  key: 'pk_test_UxDuOG7M2SZQLIDtrFMoZtRP',
  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
  locale: 'auto',
  // token is a callback that runs what ever functionality we need once Stripe has confirmed the credit card is valid, which Stripe sends back as a token object that represents the credit card. It takes a single arg, the credit card token object. 
  token: function (token) {

    // this function below creates the credit card charge. It sends the entire CC token to our backend.
    const ajaxTokenPost = function (theToken) {
      console.log(theToken)
      return $.ajax({
        url: config.apiOrigin + '/charge',
        method: 'POST',
        headers: {
          Authorization: 'Token token=' + store.user.token
        },
        data: theToken
      })
    }

    // These variables are used to build the cart object that is sent to the patch req
    const qty = $('.cart-quant').val()
    cartArray[0].quantity = qty
    const price = cartArray[0].price.replace('$', '')
    const data = {
      cart: {
        pastOrder: cartArray,
        orderTotal: parseFloat(price) * cartArray[0].quantity * 100 // total in cents
      }
    }

    // This .then chain is what needs to happen when card is confirmed. The order is updated with the contents of the cart. Then the charge request is sent. Then the update Order UI function is invoked.
    api.updateOrder(data)
      .then(() => {
        ajaxTokenPost(token)
      })
      .then(() => {
        // Uses cancelOrder UI function to clear the cart UI
        ui.updateOrderSuccess()
        // Success messaging here!
        // console.log('Purchase success!')
      })
      .catch(() => { $('#cart-message').text('Card Declined').css('color', 'red') })
  }

})
// --------------------------- END OF STRIPE MAGIC -------------------------------

// --------------------- Auth Events ------------------------
const onSignUp = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  const password = $('.sign-up input[name="credentials[password]"]').val()
  const passConfirm = $('.sign-up input[name="credentials[password_confirmation]"]').val()
  if (password === passConfirm) {
    api.signUp(data)
      .then(ui.signUpSuccess)
      .catch(ui.signUpFailure)
      // want to automatically sign in
      .then(() => api.signIn(data))
      .then(ui.signInSuccess)
      .catch(ui.signInFailure)
  } else {
    ui.signUpFailure()
  }
  $('.after-out').trigger('reset')
  $('input').prop('required', true)
}

const onSignIn = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
  $('.after-out').trigger('reset')
  $('input').prop('required', true)
}

const onSignOut = (event) => {
  event.preventDefault()
  api.signOut()
    .then(ui.cancelOrderSuccess)
    .then(ui.signOutSuccess)
    .fail(ui.signOutFailure)
}

const onChangePassword = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .fail(ui.changePasswordFailure)
  $('.after-in').trigger('reset')
  $('input').prop('required', true)
}
// ---------------------------------- End of Auth Events ----------------------

// --------------------------------- Cart Events ---------------------------------
const onShowModalActions = function (event) {
  $('#order-history').html('')
  $('#history-message').html('')
  $('#cart-message').html('')
}

const addToCart = function (event) {
  const name = $(event.target).parents('.product').find('.prod-name').text()
  const price = $(event.target).parents('.product').find('.product-price').text()

  const tableVal = `<tr class="cart-item"><td>${name}</td><td><input type=number class="cart-quant" min=1 value=1></td><td>${price}</td><td><button type="button" class="update-item-btn">Update</span></td><td><button type="button" class="delete-btn">Remove</span></td></tr>`

  const product = {
    name: name,
    quantity: 1,
    price: price
  }
  cartArray[0] = product

  const itemPrice = price.replace('$', '')
  document.getElementById('cart-total').value = itemPrice

  $('.fill-this').append(tableVal)
  $('.cart-btn').addClass('hide')
  $('.add-to-cart').text('Added to cart!').css('color', 'green')
  $('#checkout').removeClass('hide')
}

const onCheckout = () => {
  // Hide update and delete buttons moved to ui.js
  const data = {
    cart: {
      pastOrder: [''],
      orderTotal: 0
    }
  }

  api.checkout(data)
    .then(ui.checkoutSuccess)
    .catch(ui.checkoutFailure)
}

const onUpdateItem = (event) => {
  const qty = $('.cart-quant').val()
  cartArray[0].quantity = qty
  const price = cartArray[0].price.replace('$', '')
  total = (price * qty).toFixed(2)

  document.getElementById('cart-total').value = total
}

const onRemoveItem = (event) => {
  // Reveal the Cart button and empty label text so that the item can be added to the cart again after it is removed.
  const data = $(event.target)
  data.parents('tr').remove()
  const resetVal = 0.00
  document.getElementById('cart-total').value = resetVal.toFixed(2)
  $('#checkout').addClass('hide')
  $('.cart-btn').removeClass('hide')
  $('.add-to-cart').text('')
  $('#cart-message').text('Order removed').css('color', 'green')
}

const onCancelOrder = function (event) {
  // Show update and delete buttons upon order cancel event so that modifications can be made to the cart
  $('.update-item-btn').show()
  $('.delete-btn').show()
  api.cancelOrder()
    .then(ui.cancelOrderSuccess)
    .catch(ui.cancelOrderFailure)
}

const onHiddenModalActions = function (event) {
  // if the modal is hidden when a cart is present, cancel the entire order so that the item can be added again to the cart.
  if (store.cart) {
    $('.cart-btn').removeClass('hide')
    $('.add-to-cart').text('')
    $('#checkout').addClass('hide')
    onCancelOrder()
  }
}

const onGetHistory = function (event) {
  event.preventDefault()
  api.getHistory()
    .then(ui.getHistorySuccess)
    .catch(ui.getHistoryFailure)
}
// --------------------------------------------------------------------

// -------------------------- EVENT HANDLERS BELOW --------------------------------------
const addHandlers = () => {
  $('.sign-up').on('submit', onSignUp)
  $('.sign-in').on('submit', onSignIn)
  $('.sign-out').on('submit', onSignOut)
  $('.change-password').on('submit', onChangePassword)
  $('#login-button').on('click', function () { $('#sign-in-modal').modal('show') })
  $('#login-button').on('click', function () { $('#sign-in-error').text('') })
  $('#login-button').on('click', function () { $('#sign-up-error').text('') })
  $('#login-button').on('click', function () { $('#sign-out-error').text('') })
  $('#login-button').on('click', function () { $('#password-error').text('') })
  $('.cart-btn').on('click', addToCart)
  $('#checkout').on('click', onCheckout)
  $('body').on('click', '.update-item-btn', onUpdateItem)
  $('body').on('click', '.delete-btn', onRemoveItem)
  $('#delete').on('click', onCancelOrder)
  $('#get-orders').on('click', onGetHistory)
  $('#cart-button').on('click', onShowModalActions)
  $('#cart').on('hidden.bs.modal', onHiddenModalActions)
  // $('#cart-button').on('click', function () { $('.cart-btn').addClass('hide') })
  // $('#cart').on('hidden.bs.modal', function () { if (store.user) { $('.cart-btn').removeClass('hide') } })
  // $('#cart').on('hidden.bs.modal', function () { if (store.user) { $('.add-to-cart').text('') } })
  // $('.cart-btn').on('click', function () { $('#checkout').removeClass('hide') })
  $('body').on('click', function () { $('#message').html('') })
  // ---------------------- CUSTOM STRIPE INTEGRATION HANDLERS -------------------------
  $('#purchase').on('click', (event) => {
    event.preventDefault()
    handler.open({
      name: 'Nozama Toys',
      amount: total * 100
    })
  })
  window.addEventListener('popstate', () => {
    handler.close()
  })
}

module.exports = {
  addHandlers
}
