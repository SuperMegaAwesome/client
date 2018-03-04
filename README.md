# Nozama.com Full-Stack Team Project

Deployed Client Site:  https://supermegaawesome.github.io/client/ Deployed API Site: https://powerful-cove-92841.herokuapp.com/
Back-End GitHub Repository: https://github.com/SuperMegaAwesome/api

This app is designed for users to buy toys from an online store, Nozama.com
While logged in the user can view all products, add items to their cart, update item quantity, cancel their order, and purchase items in their cart using the Stripe payment system with a credit card.

### Note:

This instance of Stripe Checkout is in 'Test' Mode, and the credit card information that must be used is as follows:

**Credit Card No.:** 4242 4242 4242 4242

**Expiration Date:** Any future date (MM/YY)

**CVV:** Any three digit number

## Planning

At the beginning of this project, we decided to fully plan out exactly where we wanted this online store to go in terms of development.
We created multiple versions of a finished product, ultimately ending up with a working site where a user is able to purchase an item from the store.
In terms of development, we - as a team - divided up what tasks needed to be accomplished and the order in which they should be completed, and then began.

We started by simultaneously developing the back end with Express and MongoDB, as well as the front end HTML and authorization JavaScript.
From there, we wrote the code for all of our purchasing events, from adding an item to the cart, up to making the final purchase. This involved AJAX requests to our API - being built out at this same time - as well as developing UI messages and actions in the event’s success or failure.

All of our CRUD actions were built using the order (cart of items to be purchased) as a base, and were all created in JavaScript events.
As we encountered bugs in the overall user experience - such as being able to see another user’s cart - we fixed them by pair programming and debugging as a team. The majority of issues were solved this way, making use of our teammate’s different perspectives and thought processes.

After the functionality of the application was in order, we finished the styling using SCSS and Bootstrap methods.

Technologies used: HTML, SCSS, JavaScript, jQuery, Express, MongoDB, Mongo, Stripe, Bootstrap

Link to wireframes: https://projects.invisionapp.com/share/4GFTG0OHDMS#/screens/278947879

## Unsolved Problems and Next Steps

### Unsolved Problems
We had trouble targeting certain Stripe processes, as they were dynamically created when the script was being run during a purchase, though it was ultimately fixed.
There is also currently an issue adding more than one item to the cart, the way we have buttons and items identified and targeted in the code.

### Next Steps
We would like to expand and have users be able to add more than one type of item to their cart, and purchase multiple items at once, as well as improve the overall user experience of the application.

## User Stories:

* As a user, I want to be able to log in
* As a user, I want to be able to log out
* As a user, I want to be able to sign up
* As a user, I want to be able to change my password
* As a user, I want to be able to view all items
* As a user, I want to be able to select an item
* As a user, I want to be able to add an item to my cart
* As a user, I want to be able to view my cart
* As a user, I want to be able to check out using stripe
* As a user, I want to be able to see confirmation of my order
* As a user, I want to be able to see a total amount of my order
* As a user, I want to be able to see my past orders
* As a user, I want to be able to see my past items purchased
* As a user, I want to be able to edit my cart
* As a user, I want to be able to delete items from my cart
* As a user, I want to be able to mark item as purchased
