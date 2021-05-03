import React, { Component, Fragment } from "react";
import "./Comments.css";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

class Comments extends Component {
  render() {
    const { comments } = this.props;

    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="comment"
                      className="comment-image"
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className="comment-data">
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${userHandle}`}
                        color="primary"
                        className="displayName"
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" className="comment-time">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <Typography className="comments-body" variant="body1"> {body} </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>

              {index !== comments - 1 && <hr />}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comment: PropTypes.array.isRequired,
};

export default Comments;
