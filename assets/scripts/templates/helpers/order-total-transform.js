Handlebars.registerHelper('total', function (cart) {
  const total = cart.orderTotal / 100
  return total
})
