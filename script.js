/* 
! Modern JS Development: 

? Development stage: 
    * Modules (several different JS files) and/or 3rd party packages
    * NPM : contains open source packages to include 3rd-party code in our own code(React, jQuery, Leaflet)
        *Contains development tools that help build our applications (live-serve, Parcel, Babel)

? Build Process: 
    * Bundling (join all modules into one file)
    * Transpiling and polyfilling (usually with Babel)

? Production: 
    * JS bundle (all JS files condensed down into one JS file for production)

?Most common build tools:
    * Webpack or parcel (JS bundlers: take raw code and transform it into JS bundle)

!Modules and tooling: 

? Module: 
    * Reusable piece of code that encapsulates implementation details
    * Usually a standalone file, but it doens't have to be
    * Can contain imports(dependency) and exports(public API)
? Modules make it easy to compose software: 
    * Modules are small building blocks that we put together to build complex applications
    * Isolate components: Modules can be developed in isolation without thinking about the entire codebase.
    * Abstract code: Implement low-level code in modules and import these abstractions into other modules
    * Organized code: Modules naturally lead to a more organized codebase. 
    * Reuse Code: Modules allow us to easily reuse the same code, even across multiple projects

? ES6 Modules: Modules stored in files, exactly one module per file
    * Modules are imported during parsing phase, so before code is actually being executed.
    * Modules are imported synchronously
    * Possible thanks to top-level ("static") imports, which make imports known before execution
    * This makes bundling and dead-code eliminatino possible

?Difference between ES6 modules and Scripts: 
    ? ES6 modules: 
        * Top-level variables: Scoped to module.
        * Default mode: Strict mode.
        * Top-level 'this': undefined
        * Imports and exports: YES (need to happen at top-level all imports are hoisted)
        * HTML linking: <script type="module">
        * File Downloading: Asynchronous
    ? Script:
        * Top-level variables: Global (Lead to problems like global namespace polution where multiple scripts try to declare variables with the same name and then these variables collide)
        * Default mode: "Sloppy" mode
        * Top-level 'this': Window object
        * Imports and Exports: NO
        * HTML linking: <script>
        * File Downloading: Synchronous (unless async or defer attributes on script tag)
        
? Two types of exports:
      * Named Exports
          * Simplest way of exporting. Just put the export keyword in front of anything that we might want to export.
      * Default Exports
          * Use when we only want to export one thing per module

? Top-level Await (ES2022)
      * Can now use await keyword outside of an async function (ONLY WORKS IN MODULES)
      * This blocks the execution or the entire module
      * If one module imports a module with a top-level await then the importing module will wait for the imported module to finish the blocking code

? Main goal of module pattern: 
      * Encapsulate functionality
      * To have private data. 
      * To Expose a public API

? Common JS Modules:
      * Important to us because they have been used in Node.js for all of its existence
      * Export: 
          ? export.addToCart = function (p, q){...}
      * Import:
          ? const {addToCart} = require('./shoppingCart.js')
? Command Line: 
    * ls -> contents of current folder
    * cd -> change directory (go up and down file tree)
        * cd .. move up one level cd ../.. move up multiple levels.
    * clear console -> clear, cl
    * mkdir (folder name)-> make folder
    * touch (edit windows) (file name)-> make file 
    * live-server -> open live server
    * rm (del windows) (file name)-> delete files
    * mv (file name) (what folder to move to) -> moves file
          * Move into a parent folder -> mv script.js ../
    * rmdir (folder name) -> remove folder (only empty folders)
          * rm -R (folder name) -> removes files and folder

? NPM: 
    * Node package manager: 
          * Software on our computer AND repository
          * npm init to create package.json
          * npm i to reinstall node_modules

? Bundling with parcel and NPM scripts
    * Parcel is basically just another build tool which is on NPM
    * npm i parcel --save-dev
        * a dev dependency is a tool we need to build our application, but it's not a dependency we actually include in our code. Simply a tool
    * npm scripts are another way of running locally installed packages in the command line

? Configuring Babel and Polyfilling:
    * Plugin: A specific JS feature we want to transpile.
    * Preset: A bunch of plugins bundled together
    * Babel can only configure ES6 syntax, but not real new features added to the language. They cannot be transpiled.
        * For these new features, we can polyfill them.

*/

//? import { addToCart, totalPrice as price, qt } from './shoppingCart.js'
//?addToCart('bread', 5)
//?console.log(price, qt);

//? import * as ShoppingCart from './shoppingCart.js' <-Imports everything that is exported from shopping cart as an object
//? ShoppingCart.addToCart('bread', 5);
//? console.log(ShoppingCart.totalPrice);

//In practice we never mix named and default exports in the same module, but it can be done
//? import add, { totalPrice as price, qt } from './shoppingCart.js'
//? console.log(price, qt);

import { addToCart, cart } from './shoppingCart.js'
import 'core-js/stable' //polyfill library
import 'regenerator-runtime' //polyfilling async functions
addToCart('pizza', 2)
addToCart('bread', 5)
addToCart('apples', 2)
console.log(cart) //! Imports are NOT copies of the export, but a live conntection. They point to the same place in memory
console.log('Importing modules')

//Top level Await
//? const res = await fetch('https://jsonplaceholder.typicode.com/posts')
//? const data = await res.json()
//? console.log(data);

//Real world example Top-level await
// const getLastPost = async function () {
//   const res = await fetch('https://jsonplaceholder.typicode.com/posts')
//   const data = await res.json()
//   // console.log(data)

//   return { title: data.at(-1).title, text: data.at(-1).body } //ES2022 at Method
// }

//? const lastPost = getLastPost() //Calling an async function will always return a promise and not the data itself
//not clean
//? lastPost.then(last => console.log(last))

// const lastPost2 = await getLastPost()
// console.log(lastPost2)

//How module pattern is implemented
const ShoppingCart2 = (function () {
  const cart = []
  const shippingCost = 10
  const totalPrice = 237
  const totalQuantity = 23

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity })
    console.log(`${quantity} ${product} added to cart`)
  }

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity })
    console.log(`${quantity} ${product} ordered from supplier`)
  }

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  }
})()
//This is all possible because of closures:  Allow a function to have access to all of the variables that were present at its birthplace

ShoppingCart2.addToCart('apple', 4)
ShoppingCart2.addToCart('pizza', 5)
console.log(ShoppingCart2)

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js'
import cloneDeep from 'lodash-es'

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
}

const stateClone = Object.assign({}, state)
const stateDeepClone = cloneDeep(state); //lodash

state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone); 

if(module.hot){
  //whenever we change one of the modules it will trigger a reload, but that new modified bundle will get injected into the browser without triggering a whole page reload.
  module.hot.accept()
}
