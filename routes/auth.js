const { Router } = require('express');
const router = Router();
const User = require("../models/user")

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true
    })
})

router.get('/logout', async (req, res) => {
    //req.session.isAuthenticated = false;
    req.session.destroy(() => {
        res.redirect("/auth/login#login")
    })
})

router.post('/login', async (req, res) => {
    const user = await User.findById('5e8336162ef2323f04a798ce');
    req.session.user = user;
    req.session.isAuthenticated = true;
    //Для того, чтобы редирект произошел после установления сессии
    req.session.save(err => {
        if (err) throw err
        else res.redirect('/')
    })
})

module.exports = router;