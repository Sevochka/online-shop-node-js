const {Router} = require('express');
const router = Router();
/**
 * Отображение главной страницы
 */
router.get("/", (req, res) => {
    res.render("index", {
        title: "Главная страница",
        isHome:true
    });
});

module.exports = router;