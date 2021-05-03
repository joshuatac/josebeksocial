import React, { Component } from "react";
import "./Profile.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import dayjs from "dayjs";
import Tooltip from "@material-ui/core/Tooltip";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import EditDetails from "../profile/EditDetails";
import WcIcon from "@material-ui/icons/Wc";
import MyButton from "../../utility/MyButton";
import PhoneIcon from "@material-ui/icons/Phone";


class Profile extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      user: {
        credentials: {
          handle,
          createdAt,
          imageUrl,
          website,
          location,
          gender,
          phone,
        },
        loading,
        authenticated,
      },
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <div className="profile-card">
          <div className="image-container">
            <img alt="" src={imageUrl} />

            <input
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={this.handleImageChange}
            />

            <MyButton
              tip="Edit Profile Image"
              onClick={this.handleEditPicture}
              className="button"
            >
              <CameraAltIcon className="createIcon" />
            </MyButton>
          </div>

          <div className="title">
          <Link to={`/users/${handle}`}>
          <h2 components={Link} >
              @ {handle}
            </h2>
            </Link>
          </div>
          <div className="main-container">
            <div className="profile-wrapper">
              <div className="left">
                {" "}
                <LocationOnIcon className="info" />
              </div>
              <div className="right">{location}</div>
            </div>

            <div className="profile-wrapper">
              <div className="left">
                {" "}
                <LinkIcon className="info" />
              </div>
              <div className="right">
                {" "}
                <a href={website}>{website} </a>
              </div>
            </div>

            <div className="profile-wrapper">
              <div className="left">
                {" "}
                <WcIcon className="info" />
              </div>
              <div className="right"> {gender}</div>
            </div>

            <div className="profile-wrapper">
              <div className="left">
                <PhoneIcon className="info" />
              </div>
              <div className="right">{phone}</div>
            </div>

            <div className="profile-wrapper">
              <div className="left">
                {" "}
                <DateRangeIcon className="info" />
              </div>
              <div className="right">
                {" "}
                Joined {dayjs(createdAt).format("MMM, YYYY")}
              </div>
            </div>

            <Tooltip title="Logout" placement="top">
              <button
                className="profile-button red"
                onClick={this.handleLogout}
              >
                Logout
              </button>
            </Tooltip>

            <EditDetails />
          </div>
        </div>
      ) : (
        <div className="profile">
          <div className="profile-wrapper">
            <h2 className="no-profile">No profile found, please login again</h2>

            <Button className="login-button" component={Link} to="/login">
              Login
            </Button>

            <Button className="register-button" component={Link} to="/signup">
              Register
            </Button>
          </div>
        </div>
      )
    ) : (
      <></>
    );
    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  uploadImage: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(Profile);
