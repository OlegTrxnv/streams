import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  // fetch it's own data
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    // useful for inititalizing run
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    // grabbing info for initialValues
    const { title, description } = this.props.stream;

    return (
      <div>
        <h3>Edit your Stream</h3>
        <StreamForm
          // initialValues sent to StreamForm are handled by wrapping it ReduxForm
          initialValues={{ title: title, description: description }}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

// ownProps are provided to component by Router: match, history, location.
const mapStateToProps = (state, ownProps) => {
  // return stream object from state with key matching :id provided by Router in App
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);



