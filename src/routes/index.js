import Persons from '../pages/Persons';
import PersonInfo from '../pages/PersonInfo';


const Routes = [
  {
    path: '/persons',
    exact: true,
    component: Persons
  },
  {
    path: '/persons/:name',
    component: PersonInfo
  }
];

export default Routes;
