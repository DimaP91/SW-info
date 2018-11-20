import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';


const Home = ({ user: { isLogged } }) => {
  if (isLogged) {
    return <Redirect to="/persons" />;
  }
  return (
    <Grid container spacing={24}>
      <Grid item sm={12}>
        <Typography component="h2" variant="h1" align="center">Wellcome</Typography>
        <Typography variant="subtitle1" align="center">
          Please Login for see Star Wars persons list
        </Typography>
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Home);
