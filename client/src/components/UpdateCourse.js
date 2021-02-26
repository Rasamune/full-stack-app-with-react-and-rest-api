import React, { Component } from 'react';

class UpdateCourse extends Component {
    state = {
        course: [],
        author: [],
        id: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: []
    }

    componentDidMount() {
        // Fetch course from the API
        let id = this.props.match.params.id;
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(response => {
                if (response.status === 404) {
                    this.props.history.push('/notfound');
                }
                return response;
            })
            .then(response => response.json())
            .then(responseData => {
                this.setState({ 
                    course: responseData.course,
                    id: responseData.course.id,
                    author: responseData.course.user,
                    title: responseData.course.title,
                    description: responseData.course.description,
                    estimatedTime: responseData.course.estimatedTime,
                    materialsNeeded: responseData.course.materialsNeeded
                });
            })
            .then( () => {
                    // Check credentials
                    const { context } = this.props;
                    const userAuth = context.authenticatedUser;

                    // If credentials don't match, update is forbidden
                    if (this.state.author.emailAddress !== userAuth.emailAddress) {
                        this.props.history.push('/forbidden');
                    }
                }
            )
            .catch(error => {
                this.props.history.push('/error');
            });
    }

    render () {
        const {
            author,
            title,
            description,
            estimatedTime,
            materialsNeeded,
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
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                { errorsDisplay }
                <form onSubmit={this.handleSubmit}>
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <div>
                                <input 
                                    id="title" 
                                    name="title" 
                                    type="text" 
                                    className="input-title course--title--input" 
                                    placeholder="Course title..."
                                    onChange={this.change}
                                    value={title} />
                            </div>
                            <p>By {author.firstName} {author.lastName}</p>
                        </div>
                        <div className="course--description">
                            <div>
                                <textarea 
                                    id="description" 
                                    name="description" 
                                    placeholder="Course description..."
                                    onChange={this.change}
                                    value={description} />
                            </div>
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <div>
                                        <input 
                                            id="estimatedTime" 
                                            name="estimatedTime" 
                                            type="text" 
                                            className="course--time--input"
                                            placeholder="Hours" 
                                            onChange={this.change}
                                            value={estimatedTime} />
                                    </div>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <div>
                                        <textarea 
                                            id="materialsNeeded" 
                                            name="materialsNeeded" 
                                            placeholder="List materials..."
                                            onChange={this.change} 
                                            value={materialsNeeded} />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">Update Course</button>
                        <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                    </div>
                </form>
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
        const userAuth = context.authenticatedUser;

        const {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;
    
        // Update course payload
        const course = {
            id,
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId: userAuth.id
        };
        
        
        context.data.updateCourse(course, id, userAuth.emailAddress, userAuth.password)
            .then( errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    this.props.history.push(`/courses/${this.state.course.id}`);
                }
            })
            .catch( err => { // handle rejected promises
                console.log(err);
                this.props.history.push('/error'); // push to history stack
            });
    }

    handleCancel = (e) => {
        e.preventDefault();
        this.props.history.push(`/courses/${this.state.course.id}`);
    }

}

export default UpdateCourse;