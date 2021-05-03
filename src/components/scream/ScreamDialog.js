import React, { Component, Fragment } from "react";
import "./ScreamDialog.css";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import MyButton from "../../utility/MyButton";
import CloseIcon from "@material-ui/icons/Close";
import LikeButton from "../scream/LikeButton";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Comments from "./Comments.js";
import CommentForm from "./CommentForm.js";

class ScreamDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { userHandle, screamId } = this.props;
    const newPath = `/users/${userHandle}/scream/${screamId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getScream(this.props.screamId);
  };

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      scream: {
        screamId,
        body,
        createdAt,
        userHandle,
        userImage,
        likeCount,
        commentCount,
        comments,
      },
      UI: { loading },
    } = this.props;

    const dialogMarkup = loading ? (
      <CircularProgress size={50} className="spinner" />
    ) : (
      <div className="dialog">
      <Grid className="grid-column">

<Grid item sm={12} className="grid-column">
<img className="scream-view" src={userImage} alt="profile" />
  <Typography
    component={Link}
    color="primary"
    variant="h5"
    to={`/users/${userHandle}`}
    className="userhandle"
  >
    @ {userHandle}
  </Typography>
  <hr />
  <Typography variant="body2">
    {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
  </Typography>
  <hr />
  <Typography variant="body1">{body}</Typography>

  <div className="scream-options">
    <div className="scream-option">
      <LikeButton screamId={screamId} />
      <p>{likeCount} Likes</p>
    </div>

    <div className="scream-option">
      <ChatBubbleOutlineIcon />
      <p>{commentCount} Comments</p>
    </div>
  </div>
</Grid>

<CommentForm screamId={screamId} />
<Comments comments={comments} />
</Grid>
 </div>
);
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="expand button">
          <UnfoldMore color="primary" />
        </MyButton>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton tip="Close" onClick={this.handleClose}>
            <CloseIcon />
          </MyButton>
          <DialogContent>{dialogMarkup}</DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
ScreamDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
});

const mapActionsToProps = { getScream, clearErrors };

export default connect(mapStateToProps, mapActionsToProps)(ScreamDialog);
