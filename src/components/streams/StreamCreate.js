import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../actions";

class StreamCreate extends React.Component {
  renderError({ error, touched }) {
    // touched is eventListener from redux-form for clicking out of Field
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="field">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    // take ALL the formProps.input props provided by Field and assign them as input properties
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name="title"
          component={this.renderInput}
          label="Name of your stream:"
        />
        <Field
          name="description"
          component={this.renderInput}
          label="Describe your stream:"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "Title is missing!";
  }

  if (!formValues.description) {
    errors.description = "Provide a description!";
  }

  return errors;
};

const formWrapped = reduxForm({
  // give form a meaningful name
  form: "streamCreate",
  // wire up validate
  validate,
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);

// reduxForm is somewhat similar to connect function from "react-redux"
// Field is a wrapper React component that will handle form inputs
// Field passes formProps (key-value pairs) to renderInput and we leverage them to assign to  input properties:
//  <input onChange={formProps.input.onChange} value={} .../>
// Field passes all to renderInput all unfamiliar properties as well (label for example)
// Redux-form takes care of the rest. All inputs are in store now!
// Handled inputs are nested in store, form -> streamCreate -> values
// handleSubmit prevents default on form and passes to onSubmit helper formValues
// redux-form runs validate every time user input changes, it is expected to return errors object
// errors object entries are available on meta.error for according Field names together with meta.touched and much more
