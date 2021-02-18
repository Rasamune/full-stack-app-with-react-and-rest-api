const express = require('express');
const router = express.Router();

// Middleware to handle async
const { asyncHandler } = require('../middleware/async-handler');

const { User, Course } = require('../models');

const { authenticateUser } = require('../middleware/auth-user');

/* GET Courses listing. */
router.get('/courses', asyncHandler(async (req, res, next) => {
    // Return list of courses including the User that owns each course
    const courses = await Course.findAll({
        include: [{
            model: User,
            as: 'user',
            attributes: [
                "id",
                "firstName",
                "lastName",
                "emailAddress"
            ]
        }],
        attributes: [
            "id",
            "title",
            "description",
            "estimatedTime",
            "materialsNeeded"
        ]
    });
    res.status(200).json({ courses });
}));

/* POST Create a new course. */
router.post('/courses', authenticateUser, asyncHandler(async (req, res, next) => {
    // Create a new course
    const user = req.currentUser;
    try {
        req.body.userId = user.id;
        const course = await Course.create(req.body);
        
        // Set the Location header to the URI for the newly created course
        res.status(201).location(`/courses/${course.id}`).end();
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });   
        } else {
            throw error;
        }
    }
}));

/* GET Specified course. */
router.get('/courses/:id', asyncHandler(async (req, res, next) => {
    // Return the corresponding course along with the User that owns it
    const course = await Course.findByPk(req.params.id, {
        include: [{
            model: User,
            as: 'user',
            attributes: [
                "id",
                "firstName",
                "lastName",
                "emailAddress"
            ]
        }],
        attributes: [
            "id",
            "title",
            "description",
            "estimatedTime",
            "materialsNeeded"
        ]
    });
    if (course) {
        res.status(200).json({ course });
    } else {
        res.sendStatus(404);
    }
}));

/* PUT Updated specified course. */
router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res, next) => {
    // Update corresponding course
    let course;
    const user = req.currentUser;
    try {
        course = await Course.findByPk(req.params.id);
        if(course) {
            // If course was created by the authenticated user
            if (course.userId === user.id) {
                await course.update(req.body);
                res.sendStatus(204);
            } else {
                res.sendStatus(403).json({ message: "You are not the owner of this course, it cannot be edited by you" })
            }
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });   
        } else {
            throw error;
        }
    }
}));

/* DELETE Specified course. */
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res, next) => {
    // Delete the corresponding course
    let course;
    const user = req.currentUser;
    try {
        course = await Course.findByPk(req.params.id);
        if(course) {
            // If course was created by the authenticated user
            if (course.userId === user.id) {
                await course.destroy();
                res.sendStatus(204);
            } else {
                res.sendStatus(403).json({ message: "You are not the owner of this course, it cannot be deleted by you" })
            }
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });   
        } else {
            throw error;
        }
    }
    res.status(204);
}));

module.exports = router;