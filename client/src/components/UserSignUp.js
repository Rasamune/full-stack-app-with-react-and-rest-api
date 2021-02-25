import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: []
    }

    render () {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors
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
                <h1>Sign Up</h1>
                <div>
                    { errorsDisplay }
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            id="firstName" 
                            name="firstName" 
                            type="text" 
                            placeholder="First Name" 
                            onChange={this.change}
                            value={firstName} />
                        <input 
                            id="lastName" 
                            name="lastName" 
                            type="text" 
                            placeholder="Last Name" 
                            onChange={this.change}
                            value={lastName} />
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
                        <input 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            placeholder="Confirm Password" 
                            onChange={this.change}
                            value={confirmPassword} />
                        <div className="grid-100 pad-bottom">
                            <button className="button" type="submit">Sign Up</button>
                            <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
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
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword
        } = this.state;
    
        // New user payload
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword
        };
    
        if (password === confirmPassword) {
            context.data.createUser(user)
                .then( errors => {
                    if (errors.length) {
                        this.setState({ errors });
                    } else {
                        context.actions.signIn(emailAddress, password)
                            .then(() => {
                                this.props.history.push('/');
                            });
                    }
                })
                .catch( err => { // handle rejected promises
                    console.log(err);
                    //this.props.history.push('/error'); // push to history stack
                });
        } else {
            let errors = [];
            errors.push('Passwords must match');
            this.setState({ errors });
        }
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push('/');
    }
    
}

export default UserSignUp;