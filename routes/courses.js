const {
    Router
} = require("express");
const Course = require("../models/course");
const router = Router();
const auth = require("../middleware/auth")
const {
    courseValidators
} = require("../utils/validators");
const {
    validationResult
} = require('express-validator')



function isOwner(course, req) {
    return course.userId.toString() === req.user._id.toString()
}

router.get("/", async (req, res) => {
    //populate() - автоматически заменить айдишник пользхователя из одной коллекции
    //полноценным пользователем 
    try {
        const courses = await Course.find()
            .populate('userId', 'email name')
            .select('price title img')

        res.render("courses", {
            title: "Курсы",
            isCourses: true,
            userId: req.user ? req.user._id.toString() : null,
            courses
        });
    } catch (error) {
        throw error
    }

});

router.get("/:id/edit", auth, async (req, res) => {
    if (!req.query.allow) {
        return res.redirect("/");
    }
    try {
        const course = await Course.findById(req.params.id);
        if (!isOwner(course, req)) {
            return res.redirect('/courses')
        }
        res.render("course-edit", {
            title: `Редактирование ${course.title}`,
            course
        });
    } catch (error) {
        throw error
    }
});

router.post("/edit", courseValidators, auth, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).redirect(`/courses/${req.body.id}/edit?allow=true`)
    }

    try {
        const {
            id
        } = req.body;
        delete req.body.id;
        const course = await Course.findById(id)
        if (!isOwner(course, req)) {
            return res.redirect("/course")
        }
        Object.assign(course, req.body);
        await course.save();
        // await Course.findByIdAndUpdate(id, req.body);
        res.redirect("/courses");
    } catch (error) {
        throw error
    }

});

router.post("/remove", auth, async (req, res) => {
    try {
        await Course.deleteOne({
            _id: req.body.id,
            userId: req.user._id
        });
        res.redirect('/courses');
    } catch (error) {
        throw error;
    }
});

router.get("/:id", async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        res.render("course", {
            layout: "empty",
            title: `Курс ${course.title}`,
            course
        });
    } catch (error) {
        throw error
    }
});

module.exports = router;