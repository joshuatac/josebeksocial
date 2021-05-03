import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";


import { connect } from "react-redux";
export class LikeButton extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.screamId
      )
    )
      return true;
    else return false;
  };
  likeScream = () => {
    this.props.likeScream(this.props.screamId);
  };

  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <div className="scream-option">
        <Link to="/login">
          <ThumbUpAltOutlinedIcon color="primary" />
        </Link>
      </div>
    ) : this.likedScream() ? (
      <div className="scream-optionss" onClick={this.unlikeScream}>
        <ThumbUpIcon color="primary" />
      </div>
    ) : (
      <div className="scream-optionss" onClick={this.likeScream}>
        <ThumbUpAltOutlinedIcon color="primary" />
      </div>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { likeScream, unlikeScream };

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
