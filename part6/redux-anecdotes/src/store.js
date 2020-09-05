import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdoteReducer'
import notifyReducer from './reducers/notifyReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notify: notifyReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

console.log('STORE', store.getState())

export default store