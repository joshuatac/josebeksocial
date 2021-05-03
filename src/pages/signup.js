import React, { Component } from "react";
import "./Login.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


//Redux files

import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";
class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
      errors: {},
    };
  }
  componentWillRecieveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle,
    };
    this.props.signupUser(newUserData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="hero">
        <div className="form-box register">
          <div className="button-box">
            <h2>Register</h2>
          </div>

          <form noValidate onSubmit={this.handleSubmit} className="input-group">
            <input
              type="email"
              name="email"
              className="input-field"
              placeholder="Enter Email"
              Required="required"
              value={this.state.email}
              onChange={this.handleChange}
              error={errors.email ? true : false}
            />
            <input
              type="password"
              name="password"
              className="input-field"
              placeholder="Enter Password"
              Required="required"
              value={this.state.password}
              onChange={this.handleChange}
              error={errors.password ? true : false}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              className="input-field"
              Required="required"
              error={errors.password ? true : false}
            />

            <input
              type="text"
              name="handle"
              className="input-field"
              placeholder="Enter Username"
              Required="required"
              value={this.state.handle}
              onChange={this.handleChange}
              error={errors.password ? true : false}
            />

            <input type="submit" value="Register" className="submit-btn" />
          </form>
          <p>
            Already a registered Member ?{" "}
            <Link to="/login">
              <b>Login here</b>
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(signup);
