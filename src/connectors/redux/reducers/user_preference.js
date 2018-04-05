import { SET_LANGUAGE, SET_API_VERSION } from '../actions'

const initialState = {
  acceptLanguage: 'en-GB',
  apiDocument: {
    platform: 'browser',
    version: '0.5.2',
  },
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        acceptLanguage: action.payload,
      }
    case SET_API_VERSION:
      return {
        ...state,
        apiDocument: action.payload,
      }
    default:
      return state
  }
}
