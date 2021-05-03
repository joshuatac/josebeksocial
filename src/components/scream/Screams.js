import React, { Component } from "react";
import "../scream/Screams.css";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import relativeTime from "dayjs/plugin/relativeTime";
import { connect } from "react-redux";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";
class Screams extends Component {
  likedScream = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.scream.screamId
      )
    )
      return true;
    else return false;
  };
  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId);
  };

  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId);
  };
  render() {
    dayjs.extend(relativeTime);
    const {
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        likeCount,
        screamId,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;
    return (

      <div className="scream-container">
        <div className="scream-top">
          <Avatar src={userImage} className="scream-avatar" />
          <div className="scream-topInfo">
            <Link to={`/users/${userHandle}`}>
              <h3 component={Link}>{userHandle}</h3>
            </Link>

            <p>{dayjs(createdAt).fromNow()}</p>
          </div>
        </div>

        <div className="scream-bottom">
          <p>{body}</p>
        </div>

        <div className="scream-options">
          <div className="scream-option">
            <LikeButton screamId={screamId} />
            <p>{likeCount} Likes</p>
          </div>

          <div className="scream-option">
            <ChatBubbleOutlineIcon />
            <p>{commentCount} Comments</p>
          </div>

          <div className="scream-option">{deleteButton}</div>

          <div className="scream-option">
            <ScreamDialog
              screamId={screamId}
              userHandle={userHandle}
              openDialog={this.props.openDialog}
            />
          </div>
        </div>
      </div>
    
    
    
    );
  }
}

Screams.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Screams);
