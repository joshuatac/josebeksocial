import React, { Component } from "react";
import "./Login.css";
import propTypes from "prop-types";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {

  
    return (


      <div className="hero">
        <div className="form-box">
          <div className="button-box">
            <h2>login</h2>
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
           
            />
            <input
              type="password"
              name="password"
              className="input-field"
              placeholder="Enter Password"
              Required="required"
              value={this.state.password}
              onChange={this.handleChange}
           
            />
           
            <input type="submit" value="Login" className="submit-btn" />
          </form>
          <p>
            Dont not hanve an account ?{" "}
            <Link to="/signup">
              <b>register here</b>
            </Link>
          </p>
        </div>
      </div>
  
  
  
  );
  }
}

login.propTypes = {
  classes: propTypes.object.isRequired,
  loginUser: propTypes.func.isRequired,
  user: propTypes.object.isRequired,
  UI: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(login);
