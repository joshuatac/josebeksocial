import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";
import "./HomeScream.css";


class HomeScream extends Component {
  state = {
    body: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        error: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postScream({ body: this.state.body });
  };
  render() {
    const {
        user: {
            credentials: { imageUrl}, authenticated,
        } } = this.props;

    const homeScreamMarkup = authenticated ? (
        <div className="postScream-wrapper">
      
      <div className="postScream">
        <div className="userImage">
            <img src={imageUrl} alt="" className="homeUser" />
        </div>
        <div className="userPosts">
          <form onSubmit={this.handleSubmit}>
            <textarea
              name="body"
              type="text"
              rows="3"
              placeholder="Scream at your fellow Connects"
              onChange={this.handleChange}
              className="body-input"
            />

            <button type="submit" className="submit-scream">Post Scream</button>
          </form>
        </div>
      </div>
   
   
        </div>
  
   ) : null;

    return homeScreamMarkup;
  }
}
HomeScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { postScream, clearErrors })(
  HomeScream
);
