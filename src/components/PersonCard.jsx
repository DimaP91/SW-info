import React from 'react';
import { Card, CardContent, Typography, CardActionArea, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PersonCard = ({ name }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Card>
      <CardActionArea component={Link} to={`/persons/${encodeURIComponent(name)}`}>
        <CardContent>
          <Typography variant="h6" align="center">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
);

PersonCard.propTypes = {
  name: PropTypes.string.isRequired
};

export default PersonCard;
