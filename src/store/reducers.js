import { fetchUserData, setUserDataToStorage, deleteUserDataFromStorage } from '../services/auth';

const userStorage = fetchUserData;

const iticializeState = {
  persons: [],
  user: userStorage ? { isLogged: true, profile: userStorage } : { isLogged: false }
};

const reducer = (state = iticializeState, action) => {
  switch (action.type) {
  case 'USER_LOGIN':
    setUserDataToStorage(action.profile);
    return { ...state, user: { isLogged: true, profile: action.profile } };
  case 'USER_LOGOUT':
    deleteUserDataFromStorage();
    return { ...state, user: { isLogged: false } };
  case 'GET_PERSONS':
    return { ...state, loading: true };
  case 'REQUESTED_PERSONS_START':
    return { ...state, loading: true };
  case 'POCESS_REQUESTED_PERSONS':
    return { ...state, persons: [...state.persons, ...action.persons] };
  case 'REQUESTED_PERSONS_SUCCEEDED':
    return { ...state, persons: [...state.persons, ...action.persons], loading: false };
  case 'GET_PERSON':
    return { ...state, loading: true };
  case 'REQUESTED_PERSON_PROCESS':
    return { ...state, person: action.person };
  case 'REQUESTED_PERSON_SUCCEEDED':
    return { ...state, person: action.person, loading: false };
  default:
    return state;
  }
};
export default reducer;
