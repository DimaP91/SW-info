import { put, takeLatest, all, call, select } from 'redux-saga/effects';
import { getPersons } from '../helpers/selectors';

const API = 'https://swapi.co/api/people/';

function* fetchUrl(url) {
  return yield call(() => fetch(url).then(data => data.json()));
}

function* getAllPersons(url = API) {
  const { next, results } = yield fetchUrl(url);
  if (next) {
    yield put({ type: 'POCESS_REQUESTED_PERSONS', persons: results });
    return yield getAllPersons(next);
  }
  return yield put({ type: 'REQUESTED_PERSONS_SUCCEEDED', persons: results });
}

function* fetchPersons() {
  yield put({ type: 'REQUESTED_PERSONS_START' });
  yield getAllPersons();
}

function* fetchPerson({ id }) {
  const persons = yield select(getPersons);
  const person = persons.find(({ name }) => name === id);
  if (/^(http|https)/.test(person.homeworld)) {
    yield put({ type: 'REQUESTED_PERSON_PROCESS', person: { ...person, homeworld: false, films: false, vehicle: false } });
    const films = yield all(person.films.map(film => fetchUrl(film)));
    person.films = films.map(({ title }) => title);
    person.vehicles = yield all(person.vehicles.map(vehicle => fetchUrl(vehicle)));
    const homeworld = yield fetchUrl(person.homeworld);
    person.homeworld = homeworld.name;
  }
  yield put({ type: 'REQUESTED_PERSON_SUCCEEDED', person });
}

export default function* rootSaga() {
  yield all([
    yield takeLatest('GET_PERSONS', fetchPersons),
    yield takeLatest('GET_PERSON', fetchPerson)
  ]);
}
