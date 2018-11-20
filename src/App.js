import React, { Fragment } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Home from './pages/Home';
import Header from './components/Header';
import Routes from './routes';

const styles = {
  layout: {
    overflow: 'hidden'
  }
};

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuth === true
        ? <Component {...props} />
        : <Redirect to="/" />
    )}
  />
);


class App extends React.Component {
  render() {
    const { classes, user: { isLogged } } = this.props;
    return (
      <Fragment>
        <CssBaseline />
        <Header />
        <main className={classes.layout}>
          <BrowserRouter>
            <Switch>
              <Route path="/" component={Home} exact />
              {Routes.map((route, i) => <PrivateRoute {...route} isAuth={isLogged} key={i} />)}
            </Switch>
          </BrowserRouter>
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(App));
