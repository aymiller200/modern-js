/* 
! Imperative vs. Declarative code: 
    ? Two fundamentally different ways or writing code (paradigms)
        * Imperative: 
            * Programmer explains "HOW to do things"
            * We explaing to the computer every single step it has to follow to acheive a result.
            * Step by step recipe
            * EX: 
                const arr = [2, 4, 6, 8]
                const doubled = []
                for(let i = 0; i < arr.length; i++){
                  doubled[i] = arr[i] * 2
                }
        * Declarative:
            * Programmer tells "WHAT to do"
            * We simply describe the way the computer should achieve the result
            * The HOW gets absracted away
            * EX: 
                const arr = [2, 4, 6, 8]
                const doubled = arr.map(n => n * 2)
        * Functional Programming: 
            * Declarative programing paradigm
            * Based on the idea of writing software by combinnig many pure functions, avoiding side effects, and mutating data
                ? Side effect: Modification (mutation) of any data outside of the function (mutating external variables, logging to console, writing to DOM, etc.)
                ? Pure Functions: Function without side effects. Does not depend on external variables. Given the same inputs, always returns the same outputs.
                ? Immutability: state(data) is never modified! Instead, state is copied and the copy is mutated and returned.
            * Functional Promgramming techniques: 
                ? Try to avoid data mutations
                ? Use built-in methods that don't produce side effects
                ? Do data transformations with methods such as .map(), .filter(), .reduce()
                ? Try to avoid side effects if possible
            * Declarative Syntax:
                ? Use array and object destructuring
                ? Use the spead operator(...)
                ? Use the ternary (conditional) operator
                ? Use template literals
*/

'use strict'

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
])

const spendingLimits = Object.freeze({
  //immutable
  jonas: 1500,
  matilda: 100,
})

const getLimit = (limits, user) => limits?.[user] ?? 0

//Pure Function
const addExpense = function (
  state,
  limits,
  value,
  description,
  user = 'jonas',
) {
  const cleanUser = user.toLowerCase()
  //const limit = spendingLimits[user] ? spendingLimits[user] : 0
  return value <= getLimit(limits, cleanUser)
    ? [...state, { value: -value, description, user: cleanUser }]
    : state //spread all elements of state. Will no longer mutate budget
  // budget.push({ value: -value, description, user: cleanUser })
}
const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕')
const newBudget2 = addExpense(
  newBudget1,
  spendingLimits,
  100,
  'movies 🍿',
  'Matilda',
)
const newBudget3 = addExpense(newBudget2, spendingLimits, 200, 'Stuff', 'jonas')

console.log(newBudget1, newBudget2, newBudget3)

const checkExpenses = (state, limits) => 
  state.map(entry =>
    entry.value < -getLimit(limits, entry.user)
      ? { ...entry, flag: 'limit' }
      : entry,
  );
  // for (const entry of newBudget3) {
  //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit'
  // }

const finalBudget = checkExpenses(newBudget3, spendingLimits)
console.log(finalBudget)

// console.log(budget)

const logBigExpenses = function (state, bigLimit) {

  const bigExpenses = state.filter(entry => entry.value <= -bigLimit).map(entry => entry.description.slice(-2).join(' / '))

  console.log(bigExpenses)

  // let output = ''
  // for (const entry of budget)
  //   output +=
  //     entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : ''

  // output = output.slice(0, -2) // Remove last '/ '
  // console.log(output)

}

// console.log(budget)
logBigExpenses(finalBudget, 500)
