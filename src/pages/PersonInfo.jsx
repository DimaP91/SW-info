import React, { Component } from 'react';
import {
  Grid,
  CircularProgress,
  Icon,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPerson } from '../store/actions';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    textTransform: 'capitalize'
  },
  cell: {
    width: '100%'
  },
  list: {
    padding: '0 0 0 15px'
  },
  leftIcon: {
    marginLeft: -theme.spacing.unit
  }
});

const renderVehicles = (vehicles = [], classes) => (vehicles.length
  ? (
    <ul className={classes.list}>
      {vehicles.map(({ name: n, model }, i) => (
        <li key={i}>{n} ({model})</li>
      ))}
    </ul>
  )
  : 'none');

class PersonInfo extends Component {
  componentWillMount() {
    const { match: { params: { name } }, get } = this.props;
    get(name);
  }

  render() {
    const {
      classes,
      loading,
      history: { goBack },
      person: {
        name,
        height,
        mass,
        hair_color: hairColor,
        skin_color: skinColor,
        eye_color: eyeColor,
        birth_year: birthYear,
        gender,
        homeworld,
        vehicles,
        films
      } } = this.props;
    return (
      <Grid container spacing={24} className={classes.root}>
        <Grid item sm={12}>
          <Button variant="contained" color="secondary" onClick={goBack}>
            <Icon className={classes.leftIcon}>chevron_left</Icon>
            Back
          </Button>
          <Typography component="h2" variant="h1" align="center">{name}</Typography>
        </Grid>
        <Grid container justify="center">
          <Grid item sm={6} md={4} lg={3}>
            <Paper>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2">Height:</Typography>
                    </TableCell>
                    <TableCell className={classes.cell}>
                      <Typography variant="body1">{height}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2">Mass:</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{mass}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2">Hair color:</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{hairColor}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2">Skin color:</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{skinColor}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2">Eye color:</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{eyeColor}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2">Birth year:</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{birthYear}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2">Gender:</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{gender}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2">Homeworld:</Typography>
                    </TableCell>
                    <TableCell>
                      {loading ? <CircularProgress color="secondary" size={18} thickness={5} /> : homeworld}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2">Vehicles:</Typography>
                    </TableCell>
                    <TableCell>
                      {loading
                        ? <CircularProgress color="secondary" size={18} thickness={5} />
                        : renderVehicles(vehicles, classes)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle2">Films:</Typography>
                    </TableCell>
                    <TableCell>
                      {loading
                        ? <CircularProgress color="secondary" size={18} thickness={5} />
                        : (
                          <ul className={classes.list}>
                            {films && films.map((film, i) => <li key={i}>{film}</li>)}
                          </ul>
                        )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

PersonInfo.propTypes = {
  match: PropTypes.object.isRequired,
  person: PropTypes.object,
  loading: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  get: PropTypes.func.isRequired
};

PersonInfo.defaultProps = {
  person: {},
  loading: false
};

const mapDispatchToProps = {
  get: getPerson
};

const mapStateToProps = state => ({
  person: state.person,
  loading: state.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PersonInfo));
