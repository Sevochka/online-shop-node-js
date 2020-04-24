const {Router} = require('express');
const router = Router();
/**
 * Отображение главной страницы
 */
router.get("/", (req, res) => {
    res.redirect('/courses')
});

module.exports = router;