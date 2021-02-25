import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }

    render () {
        const {
            emailAddress,
            password,
            errors,
        } = this.state;

        let errorsDisplay = null;

        if (errors.length) {
            errorsDisplay = (
            <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
            </div>
            );
        }

        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                <h1>Sign In</h1>
                <div>
                    { errorsDisplay }
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            id="emailAddress" 
                            name="emailAddress" 
                            type="text" 
                            placeholder="Email Address" 
                            onChange={this.change}
                            value={emailAddress} />
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            placeholder="Password" 
                            onChange={this.change}
                            value={password} />
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Sign In</button>
                            <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
        );
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { emailAddress, password } = this.state;
        context.actions.signIn(emailAddress, password)
          .then( user => {
            if (user === null) {
              this.setState(() => {
                return { errors: [ 'Sign-in was unsuccessful' ]};
              });
            } else {
              this.props.history.push(from);
              console.log(`SUCCESS! ${emailAddress} is now signed in!`);
            }
          })
          .catch( err => {
            console.log(err);
            this.props.history.push('/error');
          });
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push('/');
    }
}

export default UserSignIn;