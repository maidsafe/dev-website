export const SET_LANGUAGE = 'SET_LANGUAGE'
export const SET_API_VERSION = 'SET_API_VERSION'

export const setLanguage = payload => (
  {
    type: 'SET_LANGUAGE',
    payload,
  }
)

export const setApiVersion = payload => (
  {
    type: 'SET_API_VERSION',
    payload,
  }
)
