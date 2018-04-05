import { SET_STATUS } from './actions'

const initialState = {
  fetching: false,
  errorMessage: null,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_STATUS:
      return {
        ...state,
        error: action.payload.error,
        fetching: action.payload.fetching,
      }
    default:
      return state
  }
}
