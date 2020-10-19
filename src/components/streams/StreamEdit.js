import React from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamEdit extends React.Component {
  // fetch your own data
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.streamId);
  }
  render() {
    // useful for inititalizing run
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    console.log(this.props);
    return <div>{this.props.stream.title}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  // return stream from state with key matching :streamId provided by Router in App
  return { stream: state.streams[ownProps.match.params.streamId] };
};

export default connect(mapStateToProps, { fetchStream })(StreamEdit);


// ownProps are provided by Router: match, history, location.