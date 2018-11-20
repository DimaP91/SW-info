import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Avatar,
  MenuList,
  Paper,
  Popper,
  Grow,
  ClickAwayListener,
  MenuItem
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SocialLoginBtn from './SocialLoginBtn';
import { login, logout } from '../store/actions';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
    marginTop: 10
  },
  avatar: {
    height: '100%',
    width: '100%'
  }
});

class SocialMenu extends Component {
  state = {
    open: false
  };

  handleSocialLogin = ({ _profile }) => {
    const { UserLogin } = this.props;
    UserLogin(_profile);
    this.setState({ open: false });
  };

  handleLogout = () => {
    const { UserLogout } = this.props;
    UserLogout();
    this.setState({ open: false });
  }

  handleSocialLoginFailure = (e) => {
    console.log(e);
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes, user: { isLogged, profile } } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <div>
          {isLogged
            ? (
              <Button
                buttonRef={(node) => {
                  this.anchorEl = node;
                }}
                variant="fab"
                aria-owns={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={this.handleToggle}
                color="inherit"
              >
                <Avatar
                  className={classes.avatar}
                  alt={profile.name}
                  src={profile.profilePicURL}
                />
              </Button>
            )
            : (
              <Button
                buttonRef={(node) => {
                  this.anchorEl = node;
                }}
                aria-owns={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={this.handleToggle}
                color="inherit"
              >
              Login
              </Button>
            )}
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    {isLogged
                      ? (
                        <MenuList>
                          <MenuItem
                            onClick={this.handleLogout}
                          >
                            Logout
                          </MenuItem>
                        </MenuList>
                      )
                      : (
                        <MenuList>
                          <SocialLoginBtn
                            provider="facebook"
                            appId="2452123184804904"
                            onLoginSuccess={this.handleSocialLogin}
                            onLoginFailure={this.handleSocialLoginFailure}
                          >Facebook
                          </SocialLoginBtn>
                          <SocialLoginBtn
                            provider="linkedin"
                            appId="7775kne2guetd0"
                            onLoginSuccess={this.handleSocialLogin}
                            onLoginFailure={this.handleSocialLoginFailure}
                          >Linkedin
                          </SocialLoginBtn>
                        </MenuList>
                      )}
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}


SocialMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UserLogin: PropTypes.func.isRequired,
  UserLogout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = {
  UserLogin: login,
  UserLogout: logout
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SocialMenu));
