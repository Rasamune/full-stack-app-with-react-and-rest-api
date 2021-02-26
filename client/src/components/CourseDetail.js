import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class CourseDetail extends Component {
    state = {
        course: [],
        author: []
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
                    author: responseData.course.user
                });
            })
            .catch(error => {
                this.props.history.push('/error');
            });
    }

    render () {
        const { 
            course, 
            author 
        } = this.state;

        const { context } = this.props;
        const userAuth = context.authenticatedUser;

        return (
            <div>
                <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100">
                        <span>
                            {userAuth && userAuth.emailAddress === author.emailAddress ?
                                <React.Fragment>
                                    <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                                    <button className="button" onClick={this.handleDelete}>Delete Course</button>
                                </React.Fragment>
                            :
                                <React.Fragment />
                            }
                            
                        </span>
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </div>
                </div>
                </div>
                <div className="bounds course--detail">
                <div className="grid-66">
                    <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{ course.title }</h3>
                    <p>By {author.firstName} {author.lastName}</p>
                    </div>
                    <div className="course--description">
                        <ReactMarkdown source={course.description} />
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                    <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <h3>{ course.estimatedTime }</h3>
                        </li>
                        <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <ul>
                                <ReactMarkdown source={course.materialsNeeded} />
                            </ul>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        );
    }

    handleDelete = () => {
        const { context } = this.props;
        const userAuth = context.authenticatedUser;

        const {
            course
        } = this.state;
        
        
        context.data.deleteCourse(course.id, userAuth.emailAddress, userAuth.password)
            .then( errors => {
                if (errors.length) {
                    this.setState({ errors });
                } else {
                    this.props.history.push("/");
                }
            })
            .catch( err => { // handle rejected promises
                console.log(err);
                this.props.history.push('/error'); // push to history stack
            });
    }
}

export default CourseDetail;