import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import CourseCard from './CourseCard';

class Courses extends Component {
    state = {
        courses: []
    }

    componentDidMount() {
        // Fetch courses from the API
        fetch('http://localhost:5000/api/courses')
            .then(response => response.json())
            .then(responseData => {
                this.setState({ courses: responseData.courses });
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error);
            });
    }

    render () {
        let courses;
        if (this.state.courses.length > 0) {
            courses = this.state.courses.map(course =>
                <CourseCard
                    id={course.id}
                    key={course.id}
                    title={course.title}
                />
            );
        }
        return (
            <div className="bounds">
                { courses }
                <div className="grid-33">
                    <Link className="course--module course--add--module" to="/courses/create">
                        <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>New Course</h3>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Courses;