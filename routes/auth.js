const {
    Router
} = require("express");
const router = Router();
const User = require("../models/user");
const encryptor = require('bcryptjs');

router.get("/login", async (req, res) => {
    res.render("auth/login", {
        title: "Авторизация",
        isLogin: true,
        registerError: req.flash('registerError'),
        loginError: req.flash('loginError')
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
            //Сравниваем пароль из БД с введенным 
            const areSame = await encryptor.compare(password, candidate.password)

            if (areSame) {
                //Сохраняем пользователя в объект сесиии, чтобы потом хватать
                req.session.user = candidate;
                req.session.isAuthenticated = true;
                //Для того, чтобы редирект произошел после установления сессии
                req.session.save((err) => {
                    if (err) throw err;
                    else res.redirect("/");
                });
            } else {
                //Если пароли из БД и введенный не свопадают
                //Если бы в детстве тебя почаще пороли, тебе бы подходили пароли, ну а так ты не подходишь по роли
                req.flash('loginError', 'Неправильный пароль')
                res.redirect('/auth/login#login')
            }
        } else {
            //Если маил не свопадает
            req.flash('loginError', 'Такого пользователя не существует')
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
            req.flash('registerError', 'Такой email уже занят')
            return res.redirect('/auth/login#register')
        } else {
            //Шифратор паролей, второй параметр - точность шифратора - чем больше, тем круче шифрование
            //но дольше времени занимает
            const hashPassword = await encryptor.hash(password, 10);
            console.log(hashPassword);
            
            const user = new User({
                email,
                name,
                password: hashPassword,
                cart: {
                    items: []
                }
            })
            await user.save();
            res.redirect('/auth/login#login')
        }
    } catch (error) {
        throw error
    }
});

module.exports = router;