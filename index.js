import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk'

// action name constants
const init = 'init'
const inc = 'increment'
const dec = 'decrement'
const incByAmt= 'incrementByAmount'

// store
const store = createStore(reducer,applyMiddleware(logger.default));

const history = [];

// reducer
function reducer(state = { amount: 1 }, action) {

  switch (action.type) {
    case init:
      return { amount: action.payload}
    case inc:
      return { amount: state.amount + 1 }
    case dec:
      return { amount: state.amount - 1 }
    case incByAmt:
      return { amount: state.amount + action.payload }
  
    default:
      return state
  }

}

// global state

// store.subscribe(() => {
//     history.push(store.getState())
//   console.log(history);
// });

// Async API Call
async function getUser() {
  const { data } = await axios.get('http://localhost:3000/accounts/1')
  console.log(data);
}
getUser()

// Action creator
async function initUser(value) {
   const { data } = await axios.get('http://localhost:3000/accounts/1')
  return {type: init, payload:data.amount }
}
function increment() {
  return {type: inc }
}
function decrement() {
  return {type: dec }
}
function incrementByAmount(value) {
  return {type: incByAmt, payload:value}
}



setInterval(() => {
  store.dispatch(initUser());
},3000);
