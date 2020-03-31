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
    const body = req.body

    const course = new Course({
        title: body.title,
        price: body.price,
        img: req.body.img
    })

    try {
        await course.save();
        res.redirect('/courses') 
    } catch (error) {
        throw error
    }

})

module.exports = router;