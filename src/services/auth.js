const STORAGE_KEY = 'user';

export const setUserDataToStorage = profile => localStorage.setItem(
  STORAGE_KEY, JSON.stringify(profile)
);

export const deleteUserDataFromStorage = () => localStorage.removeItem(STORAGE_KEY);

export const fetchUserData = JSON.parse(localStorage.getItem(STORAGE_KEY));

export default {
  setUserDataToStorage,
  deleteUserDataFromStorage,
  fetchUserData
};
