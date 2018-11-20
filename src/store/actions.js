export const getPersons = () => ({
  type: 'GET_PERSONS'
});

export const getPerson = param => ({
  type: 'GET_PERSON', id: param
});

export const login = profile => ({
  type: 'USER_LOGIN', profile
});

export const logout = () => ({
  type: 'USER_LOGOUT'
});

export default {
  getPersons,
  getPerson
};
