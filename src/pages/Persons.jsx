import React, { Component } from 'react';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPersons } from '../store/actions';
import PersonCard from '../components/PersonCard';
import Autocomplete from '../components/Autocomplete';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2
  }
});


class Persons extends Component {
  state = {
    personsPool: []
  }

  componentDidMount() {
    const { getAllPersons, persons } = this.props;
    if (!persons.length) {
      getAllPersons();
    }
  }

  static getDerivedStateFromProps({ persons }, { selectedPerson, personsPool }) {
    if (selectedPerson) {
      return { personsPool: personsPool.map(({ name }) => name) };
    }
    return {
      personsPool: persons.map(({ name }) => name)
    };
  }


  handleSelected = (selected) => {
    const { persons } = this.props;
    // eslint-disable-next-line react/no-unused-state
    this.setState({ selectedPerson: selected });
    const newPersons = persons.filter(({ name }) => name === selected);
    this.setState({ personsPool: newPersons });
  }

  render() {
    const { loading, classes } = this.props;
    const { personsPool } = this.state;
    return (
      <Grid container spacing={24} className={classes.root}>
        <Grid item sm={12}>
          <Typography component="h2" variant="h1" align="center">SW Persons</Typography>
        </Grid>
        <Grid container className={classes.root}>
          <Grid item xs={12} sm={12}>
            <Autocomplete pool={personsPool} onSelected={this.handleSelected} />
          </Grid>
        </Grid>
        {personsPool && personsPool.map((name, i) => <PersonCard name={name} key={i} />)}
        {loading && (
          <Grid item sm={12} align="center">
            <CircularProgress color="secondary" size={60} thickness={5} />
          </Grid>
        )}
      </Grid>
    );
  }
}

Persons.propTypes = {
  getAllPersons: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  persons: PropTypes.array,
  loading: PropTypes.bool
};

Persons.defaultProps = {
  persons: [],
  loading: false
};

const mapDispatchToProps = {
  getAllPersons: getPersons
};

const mapStateToProps = state => ({
  persons: state.persons,
  loading: state.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Persons));
