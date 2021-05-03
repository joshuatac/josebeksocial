import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Scream from "../components/scream/Screams";
import HomeScream from "../components/scream/HomeScream";
import Profile from "../components/profile/Profile";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  getScreams,
} from "../redux/actions/dataActions";
class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = !loading ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <CircularProgress size={30} className="spinner" />
    );

    return (
      <Grid container>
        <Grid item sm={8} xs={12}>
          <HomeScream />
          {recentScreamsMarkup}
        </Grid>

        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {
  getScreams
})(home);
