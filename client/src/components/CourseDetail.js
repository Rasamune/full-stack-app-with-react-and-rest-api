import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class CourseDetail extends Component {
    state = {
        course: [],
        user: []
    }

    componentDidMount() {
        // Fetch course from the API
        let id = this.props.match.params.id;
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(response => response.json())
            .then(responseData => {
                this.setState({ 
                    course: responseData.course,
                    user: responseData.course.user
                });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    render () {
        const { 
            course, 
            user 
        } = this.state;

        return (
            <div>
                <div className="actions--bar">
                <div className="bounds">
                    <div className="grid-100"><span><a className="button" href="update-course.html">Update Course</a><a className="button" href="#">Delete Course</a></span><a
                        className="button button-secondary" href="index.html">Return to List</a></div>
                </div>
                </div>
                <div className="bounds course--detail">
                <div className="grid-66">
                    <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <h3 className="course--title">{ course.title }</h3>
                    <p>By {user.firstName} {user.lastName}</p>
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
}

export default CourseDetail;