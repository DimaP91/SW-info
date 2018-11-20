import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  LinearProgress
} from '@material-ui/core';
import SocialMenu from './SocialMenu';

const styles = {
  root: {
    flexGrow: 1,
    paddingBottom: 10
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  liner: {
    position: 'absolute',
    width: '100%'
  }
};

const Header = ({ classes, loading }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.grow}>
            Star Wars Info
        </Typography>
        <SocialMenu />
      </Toolbar>
    </AppBar>
    {loading && <LinearProgress className={classes.liner} color="secondary" />}
  </div>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool
};

Header.defaultProps = {
  loading: false
};

const mapStateToProps = state => ({
  loading: state.loading
});

export default connect(mapStateToProps)(withStyles(styles)(Header));
