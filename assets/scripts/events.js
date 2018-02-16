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
  token: function (token) {
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

    ajaxTokenPost(token)
      .then(() => {
        // Uses cancelOrder UI function to clear the cart UI
        ui.cancelOrderSuccess()
        // Success messaging here!
        console.log('Purchase success!')
      })
      .catch(error => {
        console.log(error)
      }
      )
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
  $('.add-to-cart').text('Added to cart!').css('green')
}

const onCheckout = () => {
  const data = {
    cart: {
      pastOrder: [],
      orderTotal: null
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
  const data = $(event.target)
  data.parents('tr').remove()
  const resetVal = 0.00
  document.getElementById('cart-total').value = resetVal.toFixed(2)
}

const onUpdateOrder = (event) => {
  const qty = $('.cart-quant').val()
  cartArray[0].quantity = qty
  const price = cartArray[0].price.replace('$', '')
  const data = {
    cart: {
      pastOrder: cartArray,
      orderTotal: parseFloat(price) * cartArray[0].quantity * 100 // total in cents
    }
  }
  api.updateOrder(data)
    .then(ui.updateOrderSuccess)
    .catch(ui.updateOrderFailure)
}

const onCancelOrder = function (event) {
  api.cancelOrder()
    .then(ui.cancelOrderSuccess)
    .catch(ui.cancelOrderFailure)
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
  $('.cart-btn').on('click', addToCart)
  $('#checkout').on('click', onCheckout)
  $('body').on('click', '.update-item-btn', onUpdateItem)
  $('body').on('click', '.delete-btn', onRemoveItem)
  $('#update').on('click', onUpdateOrder)
  $('#delete').on('click', onCancelOrder)
  $('#get-orders').on('click', onGetHistory)
  $('#cart-button').on('click', function () { $('#order-history').html('') })
  $('#cart-button').on('click', function () { $('#history-message').html('') })
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
