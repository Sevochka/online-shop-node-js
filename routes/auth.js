const {
    Router
} = require("express");
const router = Router();
const User = require("../models/user");

router.get("/login", async (req, res) => {
    res.render("auth/login", {
        title: "Авторизация",
        isLogin: true,
    });
});

router.get("/logout", async (req, res) => {
    //req.session.isAuthenticated = false;
    req.session.destroy(() => {
        res.redirect("/auth/login#login");
    });
});

router.post("/login", async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const candidate = await User.findOne({
            email
        })
        if (candidate) {
            const areSame = password === candidate.password;

            if (areSame) {
                //Сохраняем пользователя в обхекты сесиии, чтобы потом хватать
                req.session.user = candidate;
                req.session.isAuthenticated = true;
                //Для того, чтобы редирект произошел после установления сессии
                req.session.save((err) => {
                    if (err) throw err;
                    else res.redirect("/");
                });
            } else {
                res.redirect('/auth/login#login')
            }
        } else {
            res.redirect('/auth/login#login')
        }
    } catch (error) {
        throw error
    }
});

router.post("/register", async (req, res) => {
    try {
        const {
            email,
            password,
            repeat,
            name
        } = req.body;

        const isExist = await User.findOne({
            email
        })

        if (isExist) {
            return res.redirect('/auth/login#register')
        }

        const user = new User({
            email,
            name,
            password,
            cart: {
                items: []
            }
        })
        await user.save();
        res.redirect('/auth/login#login')
    } catch (error) {
        throw error
    }
});

module.exports = router;