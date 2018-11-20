import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import SocialLogin from 'react-social-login';

const SocialLoginBtn = ({ children, triggerLogin, ...props }) => (
  <MenuItem onClick={triggerLogin} {...props}>
    { children }
  </MenuItem>
);

export default SocialLogin(SocialLoginBtn);
