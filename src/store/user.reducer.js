import { userService } from "../services/user.service.js"
import {
  backofficeSellerOrderRoutes,
  backofficeBuyerOrderRoutes,
} from "../backoffice.routes.js"
const initialState = {
  count: 10,
  user: userService.getLoggedinUser(),
  users: [],
  watchedUser: null,
  isBuyer: false,
  tableByUserState: backofficeSellerOrderRoutes,
}
export function userReducer(state = initialState, action) {
  var isBuyer = state.isBuyer
  var newState = state
  switch (action.type) {
    case "INCREMENT":
      newState = { ...state, count: state.count + 1 }
      break

    case "TOGGLE_IS_BUYER":
      newState = {
        ...state,
        isBuyer: !state.isBuyer,
        tableByUserState: isBuyer
          ? backofficeSellerOrderRoutes
          : backofficeBuyerOrderRoutes,
      }
      console.log("GETTING HERE ", newState)
      break

    case "GET_BACKOFFICE_NAVLINKS":
      console.log("GETTING HERE ", action)
      newState = { ...state, isBuyer: !state.isBuyer }
      break

    case "DECREMENT":
      newState = { ...state, count: state.count - 1 }
      break
    case "CHANGE_COUNT":
      newState = { ...state, count: state.count + action.diff }
      break
    case "SET_USER":
      newState = { ...state, user: action.user }
      break
    case "SET_WATCHED_USER":
      newState = { ...state, watchedUser: action.user }
      break
    case "REMOVE_USER":
      newState = {
        ...state,
        users: state.users.filter((user) => user._id !== action.userId),
      }
      break
    case "SET_USERS":
      newState = { ...state, users: action.users }
      break
    case "SET_SCORE":
      newState = { ...state, user: { ...state.user, score: action.score } }
      break
    default:
  }
  // For debug:
  window.userState = newState
  //   console.log("State:", newState)
  return newState
}
