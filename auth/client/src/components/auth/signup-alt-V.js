import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
    
  handleFormSubmit(formProps) {
    // Call action creator to sign up the user!
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
    

// first draft attempt/idea of comp optimization
    renderFieldsets(fieldlist){
        let fieldsetArr = Object.keys(fieldlist).map(field => 
        <fieldset className="form-group" key={field}>
          <label>{field}</label>
          <input className="form-control" {...{field}} />
          {field.touched && field.error && <div className="error">{field.error}</div>}
        </fieldset>
                                                    );
        //console.log(fieldsetArr);
        return fieldsetArr
    }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm }} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderFieldsets(this.props.fields)}
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

function validate(formProps) {// the arg is provided by HOC redux-form [and is a obj of the fields-value]
  const errors = {};
    
    //console.log(formProps);
    
    /*if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }*/
    
    //my compressed approach of the above 
    Object.keys(formProps).map(field => 
        { 
            if (!formProps[field]) {
                //errors[field] = 'Please enter ' + (field === 'email' ? 'an ' : 'a ') + field;
                errors[field] = `Please enter ${(field === 'email' ? 'an ' : 'a ') + field}`;
              }
        }
    )


  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(Signup);
