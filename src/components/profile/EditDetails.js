import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";
import "./Profile.css"
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";

class EditDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
    gender: "",
    phone: "",
    open: false,
  };

  mapUserDetailToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
      gender: credentials.gender ? credentials.gender : "",
      phone: credentials.phone ? credentials.phone : "",
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailToState(this.props.credentials);
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailToState(credentials);
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location,
      gender: this.state.gender,
      phone: this.state.phone,
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  render() {
    return (
      <Fragment>
        <Tooltip title="Edit Profile" placement="top">
          <button onClick={this.handleOpen} className="profile-button">
            Edit Profile
          </button>
        </Tooltip>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit you Details</DialogTitle>
          <DialogContent>
            <form>
              <input
                name="bio"
                type="text"
                label="Bio"
                value={this.state.bio}
                rows="3"
                className="form-details"
                placeholder="A Short bio about yourself"
                onChange={this.handleChange}
              />

              <input
                name="website"
                type="text"
                value={this.state.website}
                className="form-details"
                placeholder="Type your website url"
                onChange={this.handleChange}
              />

              <input
                name="location"
                type="text"
                label="Location"
                value={this.state.location}
                className="form-details"
                placeholder="Add your Location"
                onChange={this.handleChange}
              />

              <input
                name="phone"
                type="text"
                label="Phone"
                value={this.state.phone}
                className="form-details"
                placeholder="Add your Phone Number"
                onChange={this.handleChange}
              />

              <input
                name="gender"
                type="text"
                label="Gender"
                value={this.state.gender}
                rows="3"
                className="form-details"
                placeholder="Add your Gender"
                onChange={this.handleChange}
              />
            </form>
          </DialogContent>
          <DialogContent>
            <button onClick={this.handleClose}>Cancel</button>
            <button onClick={this.handleSubmit}>save</button>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(EditDetails);
