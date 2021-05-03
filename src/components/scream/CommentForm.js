import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";
import "./CommentForm.css"
class CommentForm extends Component {
  state = {
    body: "",
    errors: {},
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitComment(this.props.screamId, { body: this.state.body });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "" });
    }
  }
  render() {
    const { authenticated } = this.props;
    const errors = this.state.errors;

    const commentFormMarkup = authenticated ? (
      <Grid item sm={12}>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="label-comment">Comments</div>
            <h5>{errors.comment}</h5>
            <div className="form-control">
              <input
                name="body"
                type="text"
                value={this.state.body}
                error={errors.comment ? true : false}
                placeholder="comments......"
                onChange={this.handleChange}
                className="form-input"
              />
            </div>
            <div className="submit-button">
              <button className="button-comment" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
       
      </Grid>
    ) : null;

    return commentFormMarkup;
  }
}
CommentForm.propTypes = {
  subbmitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(CommentForm);
