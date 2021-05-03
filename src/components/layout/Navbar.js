import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import MyButton from "../../utility/MyButton";
import PostScream from "../scream/PostScream";
import HomeIcon from "@material-ui/icons/Home";
import "../../App.css"
import Notifications from "./Notifications"


class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar className="nav">
        <Toolbar className="nav-container nav-color">
          {authenticated ? (
            <Fragment>
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon className="white" />
                </MyButton>
              </Link>

              <MyButton tip="Post a Scream!">
               <PostScream />
              </MyButton>

              
                <Notifications />
             
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
