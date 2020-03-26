const {Router} = require('express');
const router = Router();
const Course = require('../models/course')

router.get("/", (req, res) => {
    res.render("add", {
        title: "Добавить курс",
        isAdd: true
    });
});

router.post('/', async (req, res) => {
    let body = req.body;
    const course = new Course({...body})
    await course.save();
    res.redirect('/courses')
})

module.exports = router;