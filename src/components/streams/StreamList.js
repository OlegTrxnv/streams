import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.adminId) {
      // URL-based navigation in Link, see path="/streams/edit/:id" in App
      return (
        <div className="right floated content">
          <Link
            to={`streams/edit/${stream.id}`}
            className="ui button primary">
            Edit
          </Link>
          <Link
            to={`streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreateLink() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: "right" }}>
          <Link to="/streams/new" className="ui button secondary">
            + Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderCreateLink()}
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
      </div>
    );
  }
};

// Streams are kept inside object in store, making array for easy mapping inside component
const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    adminId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);
